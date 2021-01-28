import { updatePlayer } from '../../../utils/API/api';

export const savePlayersFromGame = (players) => {
  players.forEach((player) => {
    const statItem = player;

    statItem.stats.game_played = player.time_in_game !== 'DNP' ? player.stats.game_played + 1 : player.stats.game_played;
    statItem.stats.game_started = player.start ? player.stats.game_started + 1 : player.stats.game_started;
    statItem.stats.points.total = player.stats.points.isTouched ? player.stats.points.total + player.stats.points.global : player.stats.points.global;
    statItem.stats.rebound.defence.total = player.stats.rebound.offence.isTouched
      ? player.stats.rebound.offence.total + player.stats.rebound.offence.global : player.stats.rebound.offence.global;
    statItem.stats.rebound.offence.total = player.stats.rebound.defence.isTouched
      ? player.stats.rebound.defence.total + player.stats.rebound.defence.global : player.stats.rebound.defence.global;
    statItem.stats.assists.total = player.stats.assists.isTouched
      ? player.stats.assists.total + player.stats.assists.global : player.stats.assists.global;
    statItem.stats.steals.total = player.stats.steals.isTouched
      ? player.stats.steals.total + player.stats.steals.global : player.stats.steals.global;
    statItem.stats.blocks.total = player.stats.blocks.isTouched ? player.stats.blocks.total + player.stats.blocks.global : player.stats.blocks.global;
    statItem.stats.turnover.total = player.stats.turnover.isTouched
      ? player.stats.turnover.total + player.stats.turnover.global : player.stats.turnover.global;
    statItem.stats.fouls.take.total = player.stats.fouls.take.isTouched
      ? player.stats.fouls.take.total + player.stats.fouls.take.global : player.stats.fouls.take.global;
    statItem.stats.fouls.give.total = player.stats.fouls.give.isTouched
      ? player.stats.fouls.give.total + player.stats.fouls.give.global : player.stats.fouls.give.global;
    statItem.stats.FT.made = player.stats.FT.isTouchedMade ? player.stats.FT.made + player.stats.FT.globalMade : player.stats.FT.globalMade;
    statItem.stats.FT.total = player.stats.FT.isTouched ? player.stats.FT.total + player.stats.FT.global : player.stats.FT.global;
    statItem.stats.two_points.made = player.stats.two_points.isTouchedMade
      ? player.stats.two_points.made + player.stats.two_points.globalMade : player.stats.two_points.globalMade;
    statItem.stats.two_points.total = player.stats.two_points.isTouched
      ? player.stats.two_points.total + player.stats.two_points.global : player.stats.two_points.global;
    statItem.stats.three_points.made = player.stats.three_points.isTouchedMade
      ? player.stats.three_points.made + player.stats.three_points.globalMade : player.stats.three_points.globalMade;
    statItem.stats.three_points.total = player.stats.three_points.isTouched
      ? player.stats.three_points.total + player.stats.three_points.global : player.stats.three_points.global;
    statItem.stats.zones.paint.made = player.stats.zones.paint.isTouchedMade
      ? player.stats.zones.paint.made + player.stats.zones.paint.globalMade : player.stats.zones.paint.globalMade;
    statItem.stats.zones.paint.total = player.stats.zones.paint.isTouched
      ? player.stats.zones.paint.total + player.stats.zones.paint.global : player.stats.zones.paint.global;
    statItem.stats.zones.left_two.made = player.stats.zones.left_two.isTouchedMade
      ? player.stats.zones.left_two.made + player.stats.zones.left_two.globalMade : player.stats.zones.left_two.globalMade;
    statItem.stats.zones.left_two.total = player.stats.zones.left_two.isTouched
      ? player.stats.zones.left_two.total + player.stats.zones.left_two.global : player.stats.zones.left_two.global;
    statItem.stats.zones.right_two.made = player.stats.zones.right_two.isTouchedMade
      ? player.stats.zones.right_two.made + player.stats.zones.right_two.globalMade : player.stats.zones.right_two.globalMade;
    statItem.stats.zones.right_two.total = player.stats.zones.right_two.isTouched
      ? player.stats.zones.right_two.total + player.stats.zones.right_two.global : player.stats.zones.right_two.global;
    statItem.stats.zones.left_two_45deg.made = player.stats.zones.left_two_45deg.isTouchedMade
      ? player.stats.zones.left_two_45deg.made + player.stats.zones.left_two_45deg.globalMade : player.stats.zones.left_two_45deg.globalMade;
    statItem.stats.zones.left_two_45deg.total = player.stats.zones.left_two_45deg.isTouched
      ? player.stats.zones.left_two_45deg.total + player.stats.zones.left_two_45deg.global : player.stats.zones.left_two_45deg.global;
    statItem.stats.zones.right_two_45deg.made = player.stats.zones.right_two_45deg.isTouchedMade
      ? player.stats.zones.right_two_45deg.made + player.stats.zones.right_two_45deg.globalMade : player.stats.zones.right_two_45deg.globalMade;
    statItem.stats.zones.right_two_45deg.total = player.stats.zones.right_two_45deg.isTouched
      ? player.stats.zones.right_two_45deg.total + player.stats.zones.right_two_45deg.global : player.stats.zones.right_two_45deg.global;
    statItem.stats.zones.center_two.made = player.stats.zones.center_two.isTouchedMade
      ? player.stats.zones.center_two.made + player.stats.zones.center_two.globalMade : player.stats.zones.center_two.globalMade;
    statItem.stats.zones.center_two.total = player.stats.zones.center_two.isTouched
      ? player.stats.zones.center_two.total + player.stats.zones.center_two.global : player.stats.zones.center_two.global;
    statItem.stats.zones.left_three.made = player.stats.zones.left_three.isTouchedMade
      ? player.stats.zones.left_three.made + player.stats.zones.left_three.globalMade : player.stats.zones.left_three.globalMade;
    statItem.stats.zones.left_three.total = player.stats.zones.left_three.isTouched
      ? player.stats.zones.left_three.total + player.stats.zones.left_three.global : player.stats.zones.left_three.global;
    statItem.stats.zones.right_three.made = player.stats.zones.right_three.isTouchedMade
      ? player.stats.zones.right_three.made + player.stats.zones.right_three.globalMade : player.stats.zones.right_three.globalMade;
    statItem.stats.zones.right_three.total = player.stats.zones.right_three.isTouched
      ? player.stats.zones.right_three.total + player.stats.zones.right_three.global : player.stats.zones.right_three.global;
    statItem.stats.zones.left_three_45deg.made = player.stats.zones.left_three_45deg.isTouchedMade
      ? player.stats.zones.left_three_45deg.made + player.stats.zones.left_three_45deg.globalMade : player.stats.zones.left_three_45deg.globalMade;
    statItem.stats.zones.left_three_45deg.total = player.stats.zones.left_three_45deg.isTouched
      ? player.stats.zones.left_three_45deg.total + player.stats.zones.left_three_45deg.global : player.stats.zones.left_three_45deg.global;
    statItem.stats.zones.right_three_45deg.made = player.stats.zones.right_three_45deg.isTouchedMade
      ? player.stats.zones.right_three_45deg.made + player.stats.zones.right_three_45deg.globalMade : player.stats.zones.right_three_45deg.globalMade;
    statItem.stats.zones.right_three_45deg.total = player.stats.zones.right_three_45deg.isTouched
      ? player.stats.zones.right_three_45deg.total + player.stats.zones.right_three_45deg.global : player.stats.zones.right_three_45deg.global;
    statItem.stats.zones.center_three.made = player.stats.zones.center_three.isTouchedMade
      ? player.stats.zones.center_three.made + player.stats.zones.center_three.globalMade : player.stats.zones.center_three.globalMade;
    statItem.stats.zones.center_three.total = player.stats.zones.center_three.isTouched
      ? player.stats.zones.center_three.total + player.stats.zones.center_three.global : player.stats.zones.center_three.global;

    updatePlayer(player._id, statItem);
  });
};
