rem This is not done in the most secure fashion. Only use these certs for private services.
rem This script should be extended like the sh version if Windows deployments are included later.

md %~dp0generated

openssl genrsa -out %~dp0generated\starpoint_multiversal.key


openssl req -x509 -new -subj "/CN=*.wdfp.kakaogames.com" -config starpoint.cnf -key %~dp0generated\starpoint_multiversal.key -days 365 -out %~dp0generated\starpoint_kakao_wdfp_global.crt
openssl req -x509 -new -subj "/CN=openapi-zinny3.game.kakaogames.com" -config starpoint.cnf -key %~dp0generated\starpoint_multiversal.key -days 365 -out %~dp0generated\starpoint_zinny3_openapi.crt
openssl req -x509 -new -subj "/CN=gc-openapi-zinny3.kakaogames.com" -config starpoint.cnf -key %~dp0generated\starpoint_multiversal.key -days 365 -out %~dp0generated\starpoint_zinny3_openapi_gc.crt
openssl req -x509 -new -subj "/CN=gc-infodesk-zinny3.kakaogames.com" -config starpoint.cnf -key %~dp0generated\starpoint_multiversal.key -days 365 -out %~dp0generated\starpoint_zinny3_infodesk_gc.crt

rem This is not normally necessary, but if you need to use HTTPS for starpoint you can use this
rem openssl req -x509 -new -subj "/CN=starpoint.local" -config starpoint.cnf -key %~dp0generated\starpoint_multiversal.key -days 365 -out %~dp0generated\starpoint_local.crt