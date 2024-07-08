# API Endpoints
> [!WARNING]
> This list may be incomplete and/or outdated. Check for any open pull requests or branches to make any final calls.

> [!WARNING]
> This is not a definitive list of every API endpoint that the game client interacts with.

Symbol | Meaning
:------- | :-------
:white_check_mark: | Complete
:warning: | Partial
:construction: | In Progress
:no_entry: | Incomplete & Not Being Worked On

### ``na.wdfp.kakaogames.com/latest/api/index.php``
Endpoint | Status
:------- | :-------
[/active_mission/receive](./routes/active_mission_receive.md) | :no_entry:
[/asset/get_path](./routes/asset_get_path.md) | :warning:
[/asset/version_info](./routes/asset_version_info.md) | :warning:
[/attention/check](./routes/attention_check.md) | :no_entry:
[/bonus/shown](./routes/bonus_shown.md) | :no_entry:
``/box_gacha/close`` | :white_check_mark:
[/box_gacha/exec](./routes/box_gacha_exec.md) | :warning:
[/box_gacha/get_box_list](./routes/box_gacha_get_box_list.md) | :white_check_mark:
[/character/add_character_from_town](./routes/character_add_character_from_town.md) | :no_entry:
[/character/learn_mana_node](./routes/character_learn_mana_node.md) | :white_check_mark:
[/character/open_mana_board](./routes/character_open_mana_board.md) | :white_check_mark:
[/character/over_limit](./routes/character_over_limit.md) | :white_check_mark:
[/character/receive_bond_token](./routes/character_receive_bond_token.md) | :white_check_mark:
[/character/set_illustration_settings](./routes/character_set_illustration_settings.md) | :white_check_mark:
[/encyclopedia/index](./routes/encyclopedia_index.md) | :no_entry:
[/encyclopedia/read_keyword](./routes/encyclopedia_read_keyword.md) | :no_entry:
[/equipment/set_protection](./routes/equipment_set_protection.md) | :white_check_mark:
[/equipment/upgrade](./routes/equipment_upgrade.md) | :no_entry:
[/ex_boost/draw](./routes/ex_boost_draw.md) | :white_check_mark:
[/ex_boost/first_draw](./routes/ex_boost_first_draw.md) | :white_check_mark:
[/ex_boost/select](./routes/ex_boost_select.md) | :white_check_mark:
[/expod/inject_exp](./routes/expod_inject_exp.md) | :white_check_mark:
[/expod/stack_to_exp](./routes/expod_stack_to_exp.md) | :white_check_mark:
[/follow/lists](./routes/follow_lists.md) | :no_entry:
[/gacha/exchange_character](./routes/gacha_exchange_character.md) | :no_entry:
[/gacha/exec](./routes/gacha_exec.md) | :no_entry:
[/history/receive](./routes/history_receive.md) | :no_entry:
[/how_to_get/get_list](./routes/how_to_get_get_list.md) | :no_entry:
[/load](./routes/load.md) | :white_check_mark:
[/lounge/get_list](./routes/lounge_get_list.md) | :no_entry:
[/mail/index](./routes/mail_index.md) | :no_entry:
[/mail/receive](./routes/mail_receive.md) | :no_entry:
[/mail/receive_all](./routes/mail_receive_all.md) | :no_entry:
[/mission/get_mission_progress](./routes/mission_get_mission_progress.md) | :no_entry:
[/mission/update_mission_progress](./routes/mission_update_mission_progress.md) | :no_entry:
[/multi_battle_quest/abort](./routes/multi_battle_quest_abort.md) | :no_entry:
[/multi_battle_quest/create_room](./routes/multi_battle_quest_create_room.md) | :no_entry:
[/multi_battle_quest/disband_room](./routes/multi_battle_quest_disband_room.md) | :no_entry:
[/multi_battle_quest/finish](./routes/multi_battle_quest_finish.md) | :no_entry:
[/multi_battle_quest/get_rooms](./routes/multi_battle_quest_get_rooms.md) | :no_entry:
[/multi_battle_quest/prepare](./routes/multi_battle_quest_prepare.md) | :no_entry:
[/multi_battle_quest/select_room](./routes/multi_battle_quest_select_room.md) | :no_entry:
[/multi_battle_quest/share_room](./routes/multi_battle_quest_share_room.md) | :no_entry:
[/multi_battle_quest/start](./routes/multi_battle_quest_start.md) | :no_entry:
[/multi_battle_quest/summon](./routes/multi_battle_quest_summon.md) | :no_entry:
[/multi_special_exchange/exchange_character](./routes/multi_special_exchange_exchange_character.md) | :no_entry:
[/multi_special_exchange/single_draw_ticket](./routes/multi_special_exchange_single_draw_ticket.md) | :no_entry:
[/option/update](./routes/option_update.md) | :white_check_mark:
[/option/update_in_battle](./routes/option_update_in_battle.md) | :white_check_mark:
[/party/edit](./routes/party_edit.md) | :white_check_mark:
[/party_group/edit](./routes/party_group_edit.md) | :white_check_mark:
[/payment/item_list](./routes/payment_item_list.md) | :no_entry:
[/profile/get_my_profile](./routes/profile_get_my_profile.md) | :no_entry:
[/reproduce/post](./routes/reproduce_post.md) | :white_check_mark:
[/shop/buy](./routes/shop_buy.md) | :no_entry:
[/shop/get_sales_list](./routes/shop_get_sales_list.md) | :no_entry:
[/single_battle_quest/abort](./routes/single_battle_quest_abort.md) | :white_check_mark:
[/single_battle_quest/finish](./routes/single_battle_quest_finish.md) | :white_check_mark:
[/single_battle_quest/play_continue](./routes/single_battle_quest_play_continue.md) | :no_entry:
[/single_battle_quest/start](./routes/single_battle_quest_start.md) | :white_check_mark:
[/sns/get](./routes/sns_get.md) | :no_entry:
[/story_quest/finish](./routes/story_quest_finish.md) | :white_check_mark:
[/tool/get_header_response](./routes/tool_get_header_response.md) | :white_check_mark:
[/tool/signup](./routes/tool_signup.md) | :white_check_mark:
[/tutorial/finish_trigger](./routes/tutorial_finish_trigger.md) | :white_check_mark:
[/tutorial/update_step](./routes/tutorial_update_step.md) | :white_check_mark:

### ``openapi-zinny3.game.kakao.com/service``
Endpoint | Status
:------- | :-------
[/v2/appGroup](./routes/v2_appGroup.md) | :white_check_mark:
[/v2/app](./routes/v2_app.md) | :warning:

### ``gc-infodesk-zinny3.kakaogames.com``
Endpoint | Status
:------- | :-------
[/service/v3/agreement/getForLogin](./routes/service_v3_agreement_getForLogin.md) | :white_check_mark:
[/service/v3/agreement/set](./routes/service_v3_agreement_set.md) | :no_entry:
[/service/v3/auth/loginGoogle](./routes/service_v3_auth_loginGoogle.md) | :no_entry:
[/service/v3/log/writeRoundLog](./routes/service_v3_log_writeRoundLog.md) | :no_entry:
[/service/v3/log/writeSdkBasicLog](./routes/service_v3_log_writeSdkBasicLog.md) | :no_entry:
[/service/v3/player/heartbeat](./routes/service_v3_player_heartbeat.md) | :warning:
[/service/v3/promotion/checkUrlPromotion](./routes/service_v3_promotion_checkUrlPromotion.md) | :no_entry:
[/service/v3/promotion/getStartingPopups](./routes/service_v3_promotion_getStartingPopups.md) | :no_entry:
[/service/v3/promotion/popup/getList](./routes/service_v3_promotion_popup_getList.md) | :no_entry:
[/service/v3/push/token/register](./routes/service_v3_push_token_register.md) | :white_check_mark:
[/service/v3/util/country/get](./routes/service_v3_util_country_get.md) | :white_check_mark:
[/service/v3/zat/login](./routes/service_v3_zat_login.md) | :white_check_mark:
[/service/v4/auth/loginDevice](./routes/service_v4_auth_loginDevice.md) | :white_check_mark:
[/service/v4/device/accessToken/create](./routes/service_v4_device_accessToken_create.md) | :warning: