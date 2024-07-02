## Current API Endpoint Progress
> [!WARNING]
> This list may be incomplete and/or outdated. Check for any open pull requests or branches to make any final calls.

> [!WARNING]
> This is not a definitive list of every API endpoint that the game client interacts with. It only contains endpoints that have been explored for implementation within Starpoint.

Symbol | Meaning
:------- | :-------
:white_check_mark: | Complete
:warning: | Partial
:construction: | In Progress
:no_entry: | Incomplete & Not Being Worked On

### ``na.wdfp.kakaogames.com/latest/api/index.php``
Endpoint | Status
:------- | :-------
``/asset/version_info`` | :warning:
``/asset/get_path`` | :warning:
``/attention/check`` | :white_check_mark:
``/character/set_illustration_settings`` | :white_check_mark:
``/character/over_limit`` | :white_check_mark:
``/character/receive_bond_token`` | :white_check_mark:
``/character/open_mana_board`` | :warning:
``/character/learn_mana_node`` | :white_check_mark:
``/equipment/set_protection`` | :white_check_mark:
``/expod/inject_exp`` | :white_check_mark:
``/ex_boost/first_draw`` | :white_check_mark:
``/ex_boost/draw`` | :white_check_mark:
``/ex_boost/select`` | :white_check_mark:
``/gacha/exec`` | :no_entry:
``/load`` | :white_check_mark:
``/option/update`` | :white_check_mark:
``/option/update_in_battle`` | :white_check_mark:
``/party/edit`` | :white_check_mark:
``/party_group/edit`` | :white_check_mark:
``/reproduce/post`` | :white_check_mark:
``/story_quest/finish`` | :white_check_mark:
``/single_battle_quest/finish`` | :white_check_mark:
``/single_battle_quest/abort`` | :white_check_mark:
``/single_battle_quest/start`` | :white_check_mark:
``/tool/get_header_response`` | :white_check_mark:
``/tool/signup`` | :white_check_mark:
``/tutorial/finish_trigger`` | :white_check_mark:
``/tutorial/update_step`` | :white_check_mark:

### ``openapi-zinny3.game.kakao.com/service``
Endpoint | Status
:------- | :-------
``/v3/agreement/getForLogin`` | :white_check_mark:
``/v4/auth/loginDevice`` | :white_check_mark:
``/v4/device/accessToken/create`` | :warning:
``/v3/player/heartbeat`` | :warning:
``/v3/push/token/register`` | :white_check_mark:
``/v3/util/country/get`` | :white_check_mark:
``/v3/zat/login`` | :white_check_mark:

### ``gc-infodesk-zinny3.kakaogames.com``
Endpoint | Status
:------- | :-------
``/v2/appGroup`` | :white_check_mark:
``/v2/app`` | :warning: