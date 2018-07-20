
	#setup db

	mysql -u root -e "USE audio_pi_player; CREATE TABLE IF NOT EXISTS tracks( id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, path TEXT,PRIMARY KEY (id) );"

	mysql -u root -e "USE audio_pi_player; TRUNCATE TABLE tracks;"

	#get all audio files in ~/Music

R=$IFS	#use \n as separator instead of space
IFS='
'
	list=`find /home/terruss/Musique -iname "*.mp3"`

	for path in $list; do
		#insert $path in the DB
		echo "adding $path to db"
		mysql -u root -e "USE audio_pi_player; INSERT INTO tracks(path) VALUES ('$path');"

	done

IFS=$R  #reset usuak separator

echo "DB RELOADED"
