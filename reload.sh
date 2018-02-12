
	#setup db

#mysql -u root "CREATE DATABASE IF NOT EXISTS audio_pi_player;"

mysql -u root -e "USE audio_pi_player; CREATE TABLE IF NOT EXISTS paths( id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, paths TEXT, PRIMARY KEY (id) );"

mysql -u root -e "USE audio_pi_player; TRUNCATE TABLE paths;"


	#get all audio files in ~/Music

R=$IFS	#use \n as separator instead of space
IFS='
'

list=`find /home/pi/Music -iname "*.mp3"`

for path in $list; do
	#insert $path in the DB	
	mysql -u root -e "USE audio_pi_player; INSERT INTO paths(paths) VALUES ('$path');"

done

IFS=$R
