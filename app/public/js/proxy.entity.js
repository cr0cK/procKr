(function () {
  'use strict';

  angular.module('mocKr.entity.proxy', [
    'mocKr.service.webSocket'
  ])

  /**
   * Return an object ready to be instanciated to describe a Proxy entity.
   */
  .factory('proxyFactory', ['webSocketService', function (webSocket) {
    var Proxy = function (properties) {
      this._id =
      this._port =
      this._target =
      this._status =
      this._isMocked =
      this._isDisabled;

      _.privateMerge(this, properties);

      this._isStarted = !this._isMocked;
    };

    Proxy.prototype.id = function () {
      return this._id;
    };

    Proxy.prototype.port = function () {
      return this._port;
    };

    Proxy.prototype.target = function () {
      return this._target;
    };

    /**
     * Return true if the mock is enabled.
     * The mock is started when the proxy is stopped.
     */
    Proxy.prototype.isMocked = function () {
      this._isMocked = !this._isStarted;
      return this._isMocked;
    };

    Proxy.prototype.isRecording = function () {
      return this._isRecording;
    };

    /**
     * Add the proxy by emitting a websocket to the server.
     */
    Proxy.prototype.add = function () {
      webSocket.emit('addProxy', _.publicProperties(this));
    };

    /**
     * Remove the proxy from the DB by emitting a websocket to the server.
     */
    Proxy.prototype.remove = function () {
      webSocket.emit('removeProxy', _.publicProperties(this));
    };

    /**
     * Set the proxy to record false/true in the DB by emitting a websocket
     * to the server.
     */
    Proxy.prototype.toggleRecording = function () {
      webSocket.emit('toggleRecordingProxy', _.publicProperties(this));
    };

    /**
     * Set the proxy to disabled false/true in the DB by emitting a websocket
     * to the server.
     */
    Proxy.prototype.toggleDisable = function () {
      webSocket.emit('toggleDisableProxy', _.publicProperties(this));
    };

    /**
     * Start the proxy by emitting a websocket to the server.
     */
    Proxy.prototype.start = function () {
      webSocket.emit('startProxy', _.publicProperties(this));
    };

    /**
     * Stop the proxy by emitting a websocket to the server.
     */
    Proxy.prototype.stop = function () {
      webSocket.emit('stopProxy', _.publicProperties(this));
    };

    /**
     * Start the mock by emitting a websocket to the server.
     */
    Proxy.prototype.mock = function () {
      webSocket.emit('mockProxy', _.publicProperties(this));
    };

    return Proxy;
  }]);
})();
