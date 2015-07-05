import Backbone from 'backbone';
import _ from 'lodash';
import $ from 'jquery';
Backbone.$ = $;
import Marionette from 'backbone.marionette';
import io from 'socket.io-client';
import 'babel/polyfill';

/**
 * Implements websockets in Backbone
 * Some of this was inspired by this gist:
 * https://gist.github.com/SaneMethod/58295a47f58cc6275800
 */
let { Model } = Backbone;

/**
 * Replace the Backbone.sync implementation with a websocket-based one
 *
 * @param method
 * @param model
 * @param options
 */
Backbone.sync = function(method, model, options) {
  let opts = _.extend({}, options);
  let defer = $.Deferred();

  opts.url = (opts.url) ? _.result(opts, 'url') : (model.url) ? _.result(model, 'url') : void 0;

  // If no url property has been specified, throw an error, as per the standard Backbone sync
  if (!opts.url) {
    urlError();
  }

  // Determine what data we're sending, and ensure id is present if we're performing a PATCH call
  if (!opts.data && model){
    opts.data = opts.attrs || model.toJSON(options) || {};
  }

  if ((opts.data.id === null || opts.data.id === void 0) && opts.patch === true && model){
    opts.data.id = model.id;
  }

  let namespace = model.namespace();

  let socket = io();

  // we need to know if the socket update succeeds
  socket.once(namespace + ':' + returnMethods[method], function(err, res) {
    if (err) {
      if (_.isFunction(options.error)) {
        options.error(res);
      }

      defer.reject(res);
    } else {
      if (_.isFunction(options.success)) {
        options.success(res);
      }

      defer.resolve(res);
    }
  });

  // Emit our namespaced method and the model + opts data
  socket.emit(namespace + ':' + method, opts.data);

  model.trigger('request', model, socket, options);

  // Return the promise for us to use as per usual (hanging .done blocks off, add to a .when, etc.)
  return defer.promise();
};

/**
 * Break url apart to create namespace
 *
 * Every '/' will become a ':' indicating namespace,
 * so a collection that maps to posts
 * will now have its events on the namespace
 */
Model.prototype.namespace = function() {
  return _.result(this, 'urlRoot') ||
    _.result(this.collection, 'url') ||
    urlError();
};

let returnMethods = {
  'read': 'returned',
  'create': 'created',
  'update': 'updated',
  'patch': 'patched',
  'delete': 'deleted'
};

let urlError = function() {
  throw new Error('A "url" property or function must be specified');
};
