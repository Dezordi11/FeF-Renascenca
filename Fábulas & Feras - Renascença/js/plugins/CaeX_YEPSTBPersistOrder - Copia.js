//=========================================================
// CaeX_YEPSTBPersistOrder.js
//=========================================================

/*:
 * @plugindesc v1.0 - Extension for Yanfly's STB plugin. Causes turn order to recalculate only once per turn.
 * @author Caethyril
 *
 * @help Plugin Commands:
 *   None.
 *
 * Help:
 *   To manually refresh the turn order, you can use this script call:
 *     CAE.X_YEPSTBPersistOrder.refresh();
 *
 * Compatibility:
 *   Designed for use with Yanfly's Battle Engine Core + STB plugins.
 *   Aliases:
 *     BattleManager: startBattle, makeActionOrders
 *
 * Terms of use:
 *   Free to use and modify.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.0: Initial release.
 */

var Imported = Imported || {};					// Import namespace, var can redefine
Imported.CaeX_YEPSTBPersistOrder = 1.0;				// Import declaration

var CAE = CAE || {};						// Author namespace, var can redefine
CAE.X_YEPSTBPersistOrder = CAE.X_YEPSTBPersistOrder || {};	// Plugin namespace

(function(_) {

'use strict';

// ============== Utility ============== //

	// Tracks when the turn order was last recalculated
	_.turn = -1;

	// Call manually to update the turn order whenever
	_.refresh = function() {
		CAE.X_YEPSTBPersistOrder.BattleManager_makeActionOrders.call(BattleManager);
	};

// ============ Alterations ============ //

	// Initialise turn tracker
	_.BattleManager_startBattle = BattleManager.startBattle;
	BattleManager.startBattle = function() {
		_.BattleManager_startBattle.call(this);
		_.turn = -1;
	};

	// Only recalculate order when haven't already done so this turn
	_.BattleManager_makeActionOrders = BattleManager.makeActionOrders;
	BattleManager.makeActionOrders = function() {
		if (_.turn < 0)	{
_.BattleManager_makeActionOrders.call(this);
			_.turn = 1;
			
		}
	};

})(CAE.X_YEPSTBPersistOrder);