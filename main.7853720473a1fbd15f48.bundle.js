/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "7853720473a1fbd15f48";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([100,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(20);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/main.scss
var main = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__(50);

// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/Navbar.js
var Navbar = __webpack_require__(107);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/NavbarToggler.js
var NavbarToggler = __webpack_require__(108);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/Collapse.js + 3 modules
var Collapse = __webpack_require__(111);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/Nav.js
var Nav = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/NavItem.js
var NavItem = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-svg-core/index.es.js
var index_es = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/@fortawesome/free-brands-svg-icons/index.es.js
var free_brands_svg_icons_index_es = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/Col.js
var Col = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/Card.js
var Card = __webpack_require__(102);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/CardBody.js
var CardBody = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/CardTitle.js
var CardTitle = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/Container.js
var Container = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/reactstrap/es/Row.js
var Row = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(10);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// EXTERNAL MODULE: ./node_modules/react-helmet/lib/Helmet.js
var Helmet = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/react-adsense/lib/index.js
var lib = __webpack_require__(21);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./src/app/core/constants.js
var constants = __webpack_require__(6);

// CONCATENATED MODULE: ./src/app/core/Utils.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Utils_Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: "getDate",
    value: function getDate(date) {
      if (!date) return new Date();
      return new Date(date);
    }
  }, {
    key: "printDate",
    value: function printDate(date) {
      if (!date) return '';
      date = this.getDate(date);
      var month = constants["months"][date.getMonth()];
      return month + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
  }, {
    key: "getRecentArticles",
    value: function getRecentArticles() {
      return axios_default.a.get("".concat(constants["baseUrl"], "/api/articles/").concat(constants["recentArticles"], ".json"));
    }
  }]);

  return Utils;
}();


// EXTERNAL MODULE: ./src/app/Shared/RecentArticles/RecentArticles.scss
var RecentArticles_RecentArticles = __webpack_require__(80);

// CONCATENATED MODULE: ./src/app/Shared/RecentArticles/RecentArticles.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function RecentArticles_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RecentArticles_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RecentArticles_createClass(Constructor, protoProps, staticProps) { if (protoProps) RecentArticles_defineProperties(Constructor.prototype, protoProps); if (staticProps) RecentArticles_defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var RecentArticles_RecentArticles_RecentArticles =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RecentArticles, _React$Component);

  function RecentArticles(props) {
    var _this;

    RecentArticles_classCallCheck(this, RecentArticles);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecentArticles).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "utils", new Utils_Utils());

    return _this;
  }

  RecentArticles_createClass(RecentArticles, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var blogs = this.props.articles.map(function (c) {
        return react_default.a.createElement(react_default.a.Fragment, {
          key: c.blogId
        }, react_default.a.createElement(Col["a" /* default */], {
          xs: "12",
          lg: "4",
          md: "6",
          sm: "12",
          className: "recent-card"
        }, react_default.a.createElement("div", {
          className: "title"
        }, c.title), react_default.a.createElement("div", {
          className: "details"
        }, _this2.utils.printDate(c.date) + ' - ' + c.readTimeMin + ' mins read'), react_default.a.createElement(react_router_dom["b" /* Link */], {
          to: "".concat(constants["routeLinks"].blogPage, "/").concat(c.blogId)
        }, "read more")));
      });
      return react_default.a.createElement(react_default.a.Fragment, null, blogs);
    }
  }]);

  return RecentArticles;
}(react_default.a.Component);


// EXTERNAL MODULE: ./src/app/LandingPage/LandingPage.scss
var LandingPage_LandingPage = __webpack_require__(87);

// CONCATENATED MODULE: ./src/app/LandingPage/LandingPage.js
function LandingPage_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { LandingPage_typeof = function _typeof(obj) { return typeof obj; }; } else { LandingPage_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return LandingPage_typeof(obj); }

function LandingPage_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function LandingPage_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function LandingPage_createClass(Constructor, protoProps, staticProps) { if (protoProps) LandingPage_defineProperties(Constructor.prototype, protoProps); if (staticProps) LandingPage_defineProperties(Constructor, staticProps); return Constructor; }

function LandingPage_possibleConstructorReturn(self, call) { if (call && (LandingPage_typeof(call) === "object" || typeof call === "function")) { return call; } return LandingPage_assertThisInitialized(self); }

function LandingPage_getPrototypeOf(o) { LandingPage_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return LandingPage_getPrototypeOf(o); }

function LandingPage_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function LandingPage_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) LandingPage_setPrototypeOf(subClass, superClass); }

function LandingPage_setPrototypeOf(o, p) { LandingPage_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return LandingPage_setPrototypeOf(o, p); }

function LandingPage_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












var LandingPage_LandingPage_LandingPage =
/*#__PURE__*/
function (_React$Component) {
  LandingPage_inherits(LandingPage, _React$Component);

  function LandingPage(props) {
    var _this;

    LandingPage_classCallCheck(this, LandingPage);

    _this = LandingPage_possibleConstructorReturn(this, LandingPage_getPrototypeOf(LandingPage).call(this, props));

    LandingPage_defineProperty(LandingPage_assertThisInitialized(_this), "utils", new Utils_Utils());

    _this.state = {
      categories: [],
      recent: []
    };
    return _this;
  }

  LandingPage_createClass(LandingPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios_default.a.get("".concat(constants["baseUrl"], "/api/categories/").concat(constants["categoryTypes"], ".json")).then(function (res) {
        if (res) _this2.setState({
          categories: res.data && res.data.length ? res.data.slice(0, 4) : []
        });
      })["catch"](function (err) {});
      this.utils.getRecentArticles().then(function (res) {
        if (res) _this2.setState({
          recent: res.data && res.data.length ? res.data : []
        });
      })["catch"](function (err) {});
    }
  }, {
    key: "render",
    value: function render() {
      var cats = this.state.categories.map(function (c) {
        return react_default.a.createElement(Col["a" /* default */], {
          xs: "11",
          lg: "5",
          md: "5",
          sm: "11",
          className: "card-margin",
          key: c.catId
        }, react_default.a.createElement(Card["a" /* default */], null, react_default.a.createElement(CardBody["a" /* default */], null, react_default.a.createElement(CardTitle["a" /* default */], null, c.catName), react_default.a.createElement(react_router_dom["b" /* Link */], {
          to: "".concat(constants["routeLinks"].blogListPage, "/").concat(c.catName, "/").concat(c.catId)
        }, "see blogs"))));
      });
      return react_default.a.createElement("span", {
        className: "landing-page"
      }, react_default.a.createElement(Helmet["Helmet"], null, react_default.a.createElement("title", null, "Dinesh Murali"), react_default.a.createElement("meta", {
        name: "description",
        content: "Welcome to my website. We have blog articles that you can read."
      })), react_default.a.createElement("div", {
        className: "landing-page__container"
      }, react_default.a.createElement(Container["a" /* default */], null, react_default.a.createElement(Row["a" /* default */], null, react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("div", {
        className: "welcome-text"
      }, "Learn Web-technology"), react_default.a.createElement("p", {
        className: "lead"
      }, "We have blog articles for the following technologies")), cats, react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("hr", null)), react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement(lib_default.a.Google, {
        client: "ca-pub-3929370842605036",
        slot: "7013353577",
        format: "auto",
        responsive: "true"
      })), react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("div", {
        className: "recent"
      }, "Recent Articles:")), react_default.a.createElement(RecentArticles_RecentArticles_RecentArticles, {
        articles: this.state.recent
      })))));
    }
  }]);

  return LandingPage;
}(react_default.a.Component);


// EXTERNAL MODULE: ./src/app/BlogList/BlogList.scss
var BlogList_BlogList = __webpack_require__(88);

// CONCATENATED MODULE: ./src/app/BlogList/BlogList.js
function BlogList_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { BlogList_typeof = function _typeof(obj) { return typeof obj; }; } else { BlogList_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return BlogList_typeof(obj); }

function BlogList_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BlogList_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function BlogList_createClass(Constructor, protoProps, staticProps) { if (protoProps) BlogList_defineProperties(Constructor.prototype, protoProps); if (staticProps) BlogList_defineProperties(Constructor, staticProps); return Constructor; }

function BlogList_possibleConstructorReturn(self, call) { if (call && (BlogList_typeof(call) === "object" || typeof call === "function")) { return call; } return BlogList_assertThisInitialized(self); }

function BlogList_getPrototypeOf(o) { BlogList_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return BlogList_getPrototypeOf(o); }

function BlogList_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function BlogList_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) BlogList_setPrototypeOf(subClass, superClass); }

function BlogList_setPrototypeOf(o, p) { BlogList_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return BlogList_setPrototypeOf(o, p); }

function BlogList_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var BlogList_BlogList_BlogList =
/*#__PURE__*/
function (_React$Component) {
  BlogList_inherits(BlogList, _React$Component);

  function BlogList(props) {
    var _this;

    BlogList_classCallCheck(this, BlogList);

    _this = BlogList_possibleConstructorReturn(this, BlogList_getPrototypeOf(BlogList).call(this, props));

    BlogList_defineProperty(BlogList_assertThisInitialized(_this), "utils", new Utils_Utils());

    _this.state = {
      blogs: []
    };
    return _this;
  }

  BlogList_createClass(BlogList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var params = this.props.match.params;

      if (params && params.id) {
        this.id = params.id;
        this.name = params.name;
        if (!this.id) this.props.history.goBack();
        this.fetchBlogs(this.id);
      }
    }
  }, {
    key: "fetchBlogs",
    value: function fetchBlogs(id) {
      var _this2 = this;

      if (!id) return;
      axios_default.a.get("".concat(constants["baseUrl"], "/api/categories/").concat(id, ".json")).then(function (res) {
        if (res) _this2.setState({
          catName: _this2.name,
          blogs: res.data && res.data.length ? res.data : []
        });
      })["catch"](function (err) {
        return _this2.props.history.goBack();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var blogs = this.state.blogs.map(function (c) {
        return react_default.a.createElement(react_default.a.Fragment, {
          key: c.blogId
        }, react_default.a.createElement(Col["a" /* default */], {
          lg: "3",
          md: "2"
        }), react_default.a.createElement(Col["a" /* default */], {
          xs: "11",
          lg: "8",
          md: "9",
          sm: "11",
          className: "card-margin"
        }, react_default.a.createElement(Card["a" /* default */], null, react_default.a.createElement(CardBody["a" /* default */], null, react_default.a.createElement(CardTitle["a" /* default */], null, c.blogName), react_default.a.createElement("div", {
          className: "details"
        }, _this3.utils.printDate(c.date) + ' - ' + c.readTimeMin + ' mins read'), react_default.a.createElement(react_router_dom["b" /* Link */], {
          to: "".concat(constants["routeLinks"].blogPage, "/").concat(c.blogId)
        }, "read more")))));
      });
      return react_default.a.createElement("span", {
        className: "blog-list"
      }, react_default.a.createElement(Helmet["Helmet"], null, react_default.a.createElement("title", null, this.state.catName), react_default.a.createElement("meta", {
        name: "description",
        content: "List of blogs for " + this.state.catName
      })), react_default.a.createElement("div", {
        className: "blog-list__container"
      }, react_default.a.createElement(Container["a" /* default */], null, react_default.a.createElement(Row["a" /* default */], null, react_default.a.createElement(Col["a" /* default */], null, react_default.a.createElement(Row["a" /* default */], null, react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("div", {
        className: "heading-text"
      }, this.state.catName), this.state.catName && react_default.a.createElement("p", {
        className: "lead"
      }, "Available articles")), blogs))))));
    }
  }]);

  return BlogList;
}(react_default.a.Component);


// EXTERNAL MODULE: ./src/app/Categories/Categories.scss
var Categories_Categories = __webpack_require__(89);

// CONCATENATED MODULE: ./src/app/Categories/Categories.js
function Categories_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Categories_typeof = function _typeof(obj) { return typeof obj; }; } else { Categories_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Categories_typeof(obj); }

function Categories_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Categories_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Categories_createClass(Constructor, protoProps, staticProps) { if (protoProps) Categories_defineProperties(Constructor.prototype, protoProps); if (staticProps) Categories_defineProperties(Constructor, staticProps); return Constructor; }

function Categories_possibleConstructorReturn(self, call) { if (call && (Categories_typeof(call) === "object" || typeof call === "function")) { return call; } return Categories_assertThisInitialized(self); }

function Categories_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Categories_getPrototypeOf(o) { Categories_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Categories_getPrototypeOf(o); }

function Categories_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Categories_setPrototypeOf(subClass, superClass); }

function Categories_setPrototypeOf(o, p) { Categories_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Categories_setPrototypeOf(o, p); }









var Categories_Categories_Categories =
/*#__PURE__*/
function (_React$Component) {
  Categories_inherits(Categories, _React$Component);

  function Categories(props) {
    var _this;

    Categories_classCallCheck(this, Categories);

    _this = Categories_possibleConstructorReturn(this, Categories_getPrototypeOf(Categories).call(this, props));
    _this.state = {
      categories: []
    };
    return _this;
  }

  Categories_createClass(Categories, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios_default.a.get("".concat(constants["baseUrl"], "/api/categories/_categorieTypes.json")).then(function (res) {
        if (res) _this2.setState({
          categories: res.data && res.data.length ? res.data.slice(0, 4) : []
        });
      })["catch"](function (err) {});
    }
  }, {
    key: "render",
    value: function render() {
      var cats = this.state.categories.map(function (c) {
        return react_default.a.createElement(Col["a" /* default */], {
          xs: "11",
          lg: "5",
          md: "5",
          sm: "11",
          className: "card-margin",
          key: c.catId
        }, react_default.a.createElement(Card["a" /* default */], null, react_default.a.createElement(CardBody["a" /* default */], null, react_default.a.createElement(CardTitle["a" /* default */], null, c.catName), react_default.a.createElement(react_router_dom["b" /* Link */], {
          to: "".concat(constants["routeLinks"].blogListPage, "/").concat(c.catName, "/").concat(c.catId)
        }, "more"))));
      });
      return react_default.a.createElement("span", {
        className: "categories-page"
      }, react_default.a.createElement(Helmet["Helmet"], null, react_default.a.createElement("title", null, "Dinesh murali"), react_default.a.createElement("meta", {
        name: "description",
        content: "List of topics"
      })), react_default.a.createElement("div", {
        className: "categories-page__container"
      }, react_default.a.createElement(Container["a" /* default */], null, react_default.a.createElement(Row["a" /* default */], null, react_default.a.createElement(Col["a" /* default */], null, react_default.a.createElement(Row["a" /* default */], null, react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("div", {
        className: "heading-text"
      }, "Topics"), react_default.a.createElement("p", {
        className: "lead"
      }, "These are the available topics/categories of blogs that we have so far")), cats))))));
    }
  }]);

  return Categories;
}(react_default.a.Component);


// EXTERNAL MODULE: ./node_modules/react-disqus-comments/build/main.js
var build_main = __webpack_require__(43);
var build_main_default = /*#__PURE__*/__webpack_require__.n(build_main);

// EXTERNAL MODULE: ./node_modules/react-gist/es/index.js
var es = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.es.js
var react_fontawesome_index_es = __webpack_require__(16);

// EXTERNAL MODULE: ./src/app/Blog/Blog.scss
var Blog_Blog = __webpack_require__(91);

// CONCATENATED MODULE: ./src/app/Blog/Blog.js
function Blog_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Blog_typeof = function _typeof(obj) { return typeof obj; }; } else { Blog_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Blog_typeof(obj); }

function Blog_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Blog_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Blog_createClass(Constructor, protoProps, staticProps) { if (protoProps) Blog_defineProperties(Constructor.prototype, protoProps); if (staticProps) Blog_defineProperties(Constructor, staticProps); return Constructor; }

function Blog_possibleConstructorReturn(self, call) { if (call && (Blog_typeof(call) === "object" || typeof call === "function")) { return call; } return Blog_assertThisInitialized(self); }

function Blog_getPrototypeOf(o) { Blog_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Blog_getPrototypeOf(o); }

function Blog_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Blog_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Blog_setPrototypeOf(subClass, superClass); }

function Blog_setPrototypeOf(o, p) { Blog_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Blog_setPrototypeOf(o, p); }

function Blog_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














var Blog_Blog_Blog =
/*#__PURE__*/
function (_Component) {
  Blog_inherits(Blog, _Component);

  function Blog(props) {
    var _this;

    Blog_classCallCheck(this, Blog);

    _this = Blog_possibleConstructorReturn(this, Blog_getPrototypeOf(Blog).call(this, props));

    Blog_defineProperty(Blog_assertThisInitialized(_this), "utils", new Utils_Utils());

    _this.state = {
      title: '',
      description: '',
      categoryId: '',
      readTimeMin: 0,
      date: _this.utils.getDate(),
      content: [],
      recent: [],
      shareLinks: {
        linkedIn: 'https://www.linkedin.com/shareArticle?mini=true&url=https%3A//www.dineshmg.com/&title=Learn%20Web%20development&summary=&source=',
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=https%3A//www.dineshmg.com/',
        twitter: 'https://twitter.com/home?status=https%3A//www.dineshmg.com/'
      }
    };
    _this.handleNewComment = _this.handleNewComment.bind(Blog_assertThisInitialized(_this));
    return _this;
  }

  Blog_createClass(Blog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var params = this.props.match.params;

      if (params && params.id) {
        this.id = params.id;
        if (!this.id) this.props.history.goBack();
        this.fetchBlog(this.id);
      }

      this.utils.getRecentArticles().then(function (res) {
        if (res) _this2.setState({
          recent: res.data && res.data.length ? res.data : []
        });
      })["catch"](function (err) {});
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var params = nextProps.match.params;

      if (params && params.id) {
        this.id = params.id;
        if (!this.id) this.props.history.goBack();
        this.fetchBlog(this.id);
      }
    }
  }, {
    key: "fetchBlog",
    value: function fetchBlog(id) {
      var _this3 = this;

      if (!id) return;
      axios_default.a.get("".concat(constants["baseUrl"], "/api/articles/").concat(id, ".json")).then(function (res) {
        if (res) _this3.setState({
          content: res.data.content && res.data.content.length ? res.data.content : [],
          title: res.data.title,
          description: res.data.description,
          date: _this3.utils.getDate(res.data.date),
          readTimeMin: res.data.readTimeMin,
          categoryId: res.data.categoryId
        });
        window.scrollTo(0, 0);
      })["catch"](function (err) {
        return _this3.props.history.goBack();
      });
    }
  }, {
    key: "printDate",
    value: function printDate(date) {
      if (!date) return '';
      var month = constants["months"][date.getMonth()];
      return month + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
  }, {
    key: "handleNewComment",
    value: function handleNewComment(event) {}
  }, {
    key: "render",
    value: function render() {
      var blog = this.state.content.map(function (line, index) {
        if (line.isGist && line.gist) return react_default.a.createElement(es["a" /* default */], {
          key: index,
          className: "mt-3 mb-3",
          id: line.gist
        });
        if (line.isMainHeading) return react_default.a.createElement("div", {
          className: "main-heading",
          key: index,
          dangerouslySetInnerHTML: {
            __html: line.html
          }
        });
        if (line.isSubHeading) return react_default.a.createElement("div", {
          className: "sub-heading",
          key: index,
          dangerouslySetInnerHTML: {
            __html: line.html
          }
        });
        if (line.isCodeSection) return react_default.a.createElement("div", {
          className: "code-section",
          key: index,
          dangerouslySetInnerHTML: {
            __html: line.html
          }
        });
        if (line.isQuoted) return react_default.a.createElement("div", {
          className: "quote",
          key: index,
          dangerouslySetInnerHTML: {
            __html: line.html
          }
        });
        return react_default.a.createElement("div", {
          key: index,
          dangerouslySetInnerHTML: {
            __html: line.html
          }
        });
      });
      return react_default.a.createElement("span", {
        className: "blog-page"
      }, react_default.a.createElement(Helmet["Helmet"], null, react_default.a.createElement("title", null, this.state.title), react_default.a.createElement("meta", {
        name: "description",
        content: this.state.description
      })), react_default.a.createElement("div", {
        className: "blog-page__container"
      }, react_default.a.createElement(Container["a" /* default */], null, react_default.a.createElement(Row["a" /* default */], null, react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement(lib_default.a.Google, {
        client: "ca-pub-3929370842605036",
        slot: "3072497734",
        format: "auto",
        responsive: "true"
      })), react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("div", {
        className: "heading-text"
      }, this.state.title), react_default.a.createElement("p", {
        className: "lead"
      }, this.printDate(this.state.date), "\xA0-\xA0", this.state.readTimeMin, " mins read")), react_default.a.createElement(Col["a" /* default */], {
        xs: "12",
        className: "contents"
      }, blog), react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("div", {
        className: "share"
      }, "Share:"), react_default.a.createElement("br", null), react_default.a.createElement("a", {
        target: "_blank",
        className: "mr-5",
        rel: "noopener noreferrer",
        href: this.state.shareLinks.linkedIn
      }, react_default.a.createElement(react_fontawesome_index_es["a" /* FontAwesomeIcon */], {
        icon: ['fab', 'linkedin-in'],
        size: "2x"
      })), "\xA0", react_default.a.createElement("a", {
        target: "_blank",
        className: "mr-5",
        rel: "noopener noreferrer",
        href: this.state.shareLinks.facebook
      }, react_default.a.createElement(react_fontawesome_index_es["a" /* FontAwesomeIcon */], {
        icon: ['fab', 'facebook'],
        size: "2x"
      })), react_default.a.createElement("a", {
        target: "_blank",
        className: "mr-5",
        rel: "noopener noreferrer",
        href: this.state.shareLinks.twitter
      }, react_default.a.createElement(react_fontawesome_index_es["a" /* FontAwesomeIcon */], {
        icon: ['fab', 'twitter'],
        size: "2x"
      }))), react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("hr", null)), react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("div", {
        className: "recent"
      }, "Recent Articles:")), react_default.a.createElement(RecentArticles_RecentArticles_RecentArticles, {
        articles: this.state.recent
      }), react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("hr", null))), react_default.a.createElement(Row["a" /* default */], null, react_default.a.createElement(Col["a" /* default */], null, react_default.a.createElement(build_main_default.a, {
        shortname: "shadowfalls-github-io-webtutor-1",
        identifier: this.state.title + '123',
        title: this.state.title,
        onNewComment: this.handleNewComment
      }))))));
    }
  }]);

  return Blog;
}(react["Component"]);


// EXTERNAL MODULE: ./src/app/About/About.scss
var About_About = __webpack_require__(92);

// CONCATENATED MODULE: ./src/app/About/About.js
function About_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { About_typeof = function _typeof(obj) { return typeof obj; }; } else { About_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return About_typeof(obj); }

function About_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function About_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function About_createClass(Constructor, protoProps, staticProps) { if (protoProps) About_defineProperties(Constructor.prototype, protoProps); if (staticProps) About_defineProperties(Constructor, staticProps); return Constructor; }

function About_possibleConstructorReturn(self, call) { if (call && (About_typeof(call) === "object" || typeof call === "function")) { return call; } return About_assertThisInitialized(self); }

function About_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function About_getPrototypeOf(o) { About_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return About_getPrototypeOf(o); }

function About_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) About_setPrototypeOf(subClass, superClass); }

function About_setPrototypeOf(o, p) { About_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return About_setPrototypeOf(o, p); }










var About_About_About =
/*#__PURE__*/
function (_React$Component) {
  About_inherits(About, _React$Component);

  function About(props) {
    var _this;

    About_classCallCheck(this, About);

    _this = About_possibleConstructorReturn(this, About_getPrototypeOf(About).call(this, props));
    _this.state = {
      title: 'About',
      description: "I am Dinesh. I am enthusiastic software engineer who loves coding. I am open for freelancing\n            work related to JavaScript. I like travelling to new places. I love learning new things.\n            ",
      linkedIn: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile',
      github: 'https://github.com/shadowfalls'
    };
    return _this;
  }

  About_createClass(About, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("span", {
        className: "about-page"
      }, react_default.a.createElement(Helmet["Helmet"], null, react_default.a.createElement("title", null, this.state.title), react_default.a.createElement("meta", {
        name: "description",
        content: this.state.description
      })), react_default.a.createElement("div", {
        className: "about-page__container"
      }, react_default.a.createElement(Container["a" /* default */], null, react_default.a.createElement(Row["a" /* default */], null, react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("div", {
        className: "heading-text"
      }, this.state.title)), react_default.a.createElement(Col["a" /* default */], {
        xs: "12",
        className: "contents"
      }, react_default.a.createElement("hr", null), this.state.description), react_default.a.createElement(Col["a" /* default */], {
        xs: "12",
        className: "mb-3"
      }, react_default.a.createElement("hr", null), "Follow me at:"), react_default.a.createElement(Col["a" /* default */], {
        xs: "12"
      }, react_default.a.createElement("a", {
        target: "_blank",
        className: "mr-5",
        rel: "noopener noreferrer",
        href: this.state.linkedIn
      }, react_default.a.createElement(react_fontawesome_index_es["a" /* FontAwesomeIcon */], {
        icon: ['fab', 'linkedin-in'],
        size: "2x"
      })), "\xA0", react_default.a.createElement("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: this.state.github
      }, react_default.a.createElement(react_fontawesome_index_es["a" /* FontAwesomeIcon */], {
        icon: ['fab', 'github'],
        size: "2x"
      })))))));
    }
  }]);

  return About;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/App.js
function App_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { App_typeof = function _typeof(obj) { return typeof obj; }; } else { App_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return App_typeof(obj); }

function App_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function App_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function App_createClass(Constructor, protoProps, staticProps) { if (protoProps) App_defineProperties(Constructor.prototype, protoProps); if (staticProps) App_defineProperties(Constructor, staticProps); return Constructor; }

function App_possibleConstructorReturn(self, call) { if (call && (App_typeof(call) === "object" || typeof call === "function")) { return call; } return App_assertThisInitialized(self); }

function App_getPrototypeOf(o) { App_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return App_getPrototypeOf(o); }

function App_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function App_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) App_setPrototypeOf(subClass, superClass); }

function App_setPrototypeOf(o, p) { App_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return App_setPrototypeOf(o, p); }







index_es["b" /* library */].add([free_brands_svg_icons_index_es["c" /* faLinkedinIn */], free_brands_svg_icons_index_es["b" /* faGithub */], free_brands_svg_icons_index_es["d" /* faTwitter */], free_brands_svg_icons_index_es["a" /* faFacebook */]]);







var App_App =
/*#__PURE__*/
function (_Component) {
  App_inherits(App, _Component);

  function App(props) {
    var _this;

    App_classCallCheck(this, App);

    _this = App_possibleConstructorReturn(this, App_getPrototypeOf(App).call(this, props));
    _this.state = {
      isOpen: false
    };
    _this.toggle = _this.toggle.bind(App_assertThisInitialized(_this));
    return _this;
  }

  App_createClass(App, [{
    key: "toggle",
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement(react_router_dom["a" /* BrowserRouter */], null, react_default.a.createElement("span", {
        className: "root"
      }, react_default.a.createElement(Navbar["a" /* default */], {
        className: "desktop-nav",
        color: "light",
        light: true,
        expand: "md"
      }, react_default.a.createElement(react_router_dom["b" /* Link */], {
        className: "navbar-brand",
        to: {
          pathname: '/'
        }
      }, "Dinesh Murali"), react_default.a.createElement(NavbarToggler["a" /* default */], {
        onClick: this.toggle
      }), react_default.a.createElement(Collapse["a" /* default */], {
        isOpen: this.state.isOpen,
        navbar: true
      }, react_default.a.createElement(Nav["a" /* default */], {
        className: "ml-auto",
        navbar: true
      }, react_default.a.createElement(NavItem["a" /* default */], null, react_default.a.createElement(react_router_dom["b" /* Link */], {
        className: "nav-link",
        to: {
          pathname: constants["routeLinks"].categories
        }
      }, "Topics")), react_default.a.createElement(NavItem["a" /* default */], null, react_default.a.createElement(react_router_dom["b" /* Link */], {
        className: "nav-link",
        to: {
          pathname: constants["routeLinks"].about
        }
      }, "About"))))), react_default.a.createElement("div", {
        className: "cover-image"
      }), react_default.a.createElement(react_router["c" /* Switch */], null, react_default.a.createElement(react_router["a" /* Route */], {
        exact: true,
        path: "/topics",
        component: Categories_Categories_Categories
      }), react_default.a.createElement(react_router["a" /* Route */], {
        exact: true,
        path: "/blogs/:name/:id",
        component: BlogList_BlogList_BlogList
      }), react_default.a.createElement(react_router["a" /* Route */], {
        exact: true,
        path: "/blog/:id",
        component: Blog_Blog_Blog
      }), react_default.a.createElement(react_router["a" /* Route */], {
        exact: true,
        path: "/about",
        component: About_About_About
      }), react_default.a.createElement(react_router["a" /* Route */], {
        exact: true,
        path: "/",
        component: LandingPage_LandingPage_LandingPage
      }))));
    }
  }]);

  return App;
}(react["Component"]);

/* harmony default export */ var src_App = (App_App);
// CONCATENATED MODULE: ./src/index.js





var wrapper = document.getElementById("root");
wrapper ? react_dom_default.a.render(react_default.a.createElement(src_App, null), wrapper) : false;

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AppConstants = function AppConstants() {
  _classCallCheck(this, AppConstants);

  _defineProperty(this, "baseUrl", 'https://raw.githubusercontent.com/shadowfalls/mirror/master/src');

  _defineProperty(this, "routeLinks", {
    categories: '/topics',
    about: '/about',
    blogListPage: '/blogs',
    blogPage: '/blog'
  });

  _defineProperty(this, "months", {
    0: 'January',
    1: 'Febuary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  });

  _defineProperty(this, "categoryTypes", '_categorieTypes');

  _defineProperty(this, "recentArticles", '_recentArticlesJson');
};

var constants = new AppConstants();
module.exports = constants;

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=main.7853720473a1fbd15f48.bundle.js.map