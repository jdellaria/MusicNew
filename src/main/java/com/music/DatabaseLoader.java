/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.music;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.music.models.Album;
import com.music.models.AlbumRepository;
import com.music.models.SongRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.*;
import java.util.Calendar;

/**
 * @author Jon Dellaria
 */
// tag::code[]
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final AlbumRepository Arepository;
	private final SongRepository Srepository;

	@Autowired
//	public DatabaseLoader(EmployeeRepository Erepository) {
//		this.Erepository = Erepository;
//	}
	public DatabaseLoader(AlbumRepository Arepository,  SongRepository Srepository) {
		this.Arepository = Arepository;
                this.Srepository = Srepository;
	}

	@Override
	public void run(String... strings) throws Exception {


    // (2) create a java timestamp object that represents the current time (i.e., a "current timestamp")
                Calendar calendar = Calendar.getInstance();
                java.sql.Timestamp sqlDate = new java.sql.Timestamp(calendar.getTime().getTime());
		Album al;


//	public Albums(String Album, Long AlbumId, Long refId, Date DateAdded, Date LastSelected)
//		this.Arepository.save(new Album("Greatest4 hits",(long)2000  ,sqlDate ,sqlDate ));
//		this.Arepository.save(new Album("1984 5" ,(long)2000  ,sqlDate ,sqlDate ));
//		al = new Album("Woc and Woll6",(long)2000  ,sqlDate ,sqlDate );
//		this.Arepository.save(al);
 //   public Song(String Name, String Artist, String Album, String Grouping, String Location, int SongIndex, int TrackNumber, int SongYear, Albums AlbumId, long ArtistId) {
//                this.Srepository.save(new Song("songNasme", "Artist", "Album", "Grouping", "Location", 123, 1, 1984, al, 323423));
//                this.Srepository.save(new Song("songNasme2", "Artist2", "Album2", "Grouping2", "Location2", 1232, 12, 19842, al, 3234232));
//                this.Srepository.save(new Song("songNasme3", "Artist3", "Album3", "Grouping3", "Location3", 1233, 13, 19843, al, 3234233));

	}
}
// end::code[]
