drop table if exists Music.DiffTime;
drop table if exists Music.ZeroTimeCount;
drop table if exists Music.ZeroTimeSongs;

/* if this set command is not run the following error will occure "Error Code: 1067. Invalid default value for 'BeginPlayTime'" to see the value of this variable use this command "show variables like 'sql_mode' ;" */
SET sql_mode = '';

/* Create table that takes each item in the playq and determintes the amount of time the song actually played. */
create table Music.DiffTime(Idy BIGINT auto_increment PRIMARY KEY) SELECT id,songID, TIMESTAMPDIFF(second, BeginPlayTime, EndPlayTime ) as diff, Music.songlibrary.Name, Music.songlibrary.Artist, Music.songlibrary.Album, Music.playq.BeginPlayTime, Music.songlibrary.Location from Music.playq  inner join Music.songlibrary on Music.playq.songID = Music.songlibrary.SongIndex;

/* Create table that counts the number of times that the song actually had a song play time of 0 seconds. */
create table Music.ZeroTimeCount (Idy BIGINT auto_increment PRIMARY KEY) SELECT songID, COUNT(*) songcount FROM Music.DiffTime  where diff = 0 GROUP BY songID;

/* Create table that contains all the songs that were tried to be play and have a zero second play time */
create table Music.ZeroTimeSongs(Idy BIGINT auto_increment PRIMARY KEY) SELECT Music.DiffTime.songID, Music.songlibrary.Name, Music.songlibrary.Artist, Music.songlibrary.Album, Music.songlibrary.Location, Music.DiffTime.BeginPlayTime from Music.DiffTime inner join Music.songlibrary on Music.DiffTime.songID = Music.songlibrary.SongIndex where Music.DiffTime.diff = 0 ;

/* These 2 querys should return the same results*/
SELECT * FROM Music.DiffTime where diff = 0 order by BeginPlayTime desc;
SELECT * FROM Music.ZeroTimeSongs  order by BeginPlayTime desc;
