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
package com.music.models;
/**
 * @author Jon Dellaria
 */
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


//import com.greglturnquist.payroll.HibernateUtil;

import java.sql.*;

import lombok.Data;


// tag::code[]
@Data
@Entity
@Table(name = "songlibrary")
public class Song {
	@Column(name = "Name", insertable= false, updatable= false)
    public String name;

	@Column(name = "Artist")
    public String artist;

	@Column(name = "Composer")
    public String composer;

	@Column(name = "Album")
    public String album;

	@Column(name = "Grouping")
    public String grouping;

	@Column(name = "Genre")
    public String genre;

	@Column(name = "Size")
    public Integer size;

	@Column(name = "SongTime")
    public Integer songtime;

	@Column(name = "DiscNumber")
    public Integer discnumber;

	@Column(name = "DiscCount")
    public Integer disccount;

	@Column(name = "TrackNumber")
    public Integer tracknumber;

	@Column(name = "SongYear")
    public Integer songyear;

	@Column(name = "DateModified")
    public java.sql.Timestamp datemodified;

	@Column(name = "DateAdded")
    public java.sql.Timestamp dateadded;

	@Column(name = "BitRate", nullable=true)
    public Integer bitrate;

	@Column(name = "SampleRate")
    public Integer samplerate;

	@Column(name = "VolumeAdjustment")
    public String volumeadjustment;

	@Column(name = "Kind")
    public String kind;

	@Column(name = "Equalizer")
    public String equalizer;

	@Column(name = "Comments")
    public String comments;

	@Column(name = "PlayCount")
    public Integer playcount;

	@Column(name = "LastPlayed")
    public java.sql.Timestamp lastplayed;

	@Column(name = "MyRating")
    public String myrating;

	@Column(name = "Location")
    public String location;

	@Column(name = "SongIndex")
    public @Id @GeneratedValue Integer songindex;

	@Column(name = "Name")
    public String catalog;

//	@ManyToOne//(optional = false)
//	@JoinColumn(name = "AlbumId")
	@Column(name = "AlbumId")
    public long albumid;
	@Column(name = "ArtistId")
    public long artistid;

    public Song() {}


    public Song(String Name, String Artist, String Album, String Grouping, String Location, Integer SongIndex, Integer TrackNumber, Integer SongYear, long AlbumId, long ArtistId) {
        this.name = Name;
        this.artist = Artist;
//        this.Composer = Composer;
        this.album = Album;
        this.grouping = Grouping;
//        this.Genre = Genre;
//        this.Size = Size;
//        this.Songtime = SongTime;
//        this.Discnumber = DiscNumber;
//        this.Disccount = DiscCount;
        this.tracknumber = TrackNumber;
        this.songyear = SongYear;
//        this.Datemodified = DateModified;
//        this.Dateadded = DateAdded;
//        this.Bitrate = BitRate;
//        this.Samplerate = SampleRate;
//        this.Volumeadjustment = VolumeAdjustment;
//        this.Kind = Kind;
//        this.Equalizer = Equalizer;
//        this.Comments = Comments;
//        this.Playcount = PlayCount;
//        this.Lastplayed = LastPlayed;
//        this.Myrating = MyRating;
        this.location = Location;
        this.songindex = SongIndex;
//        this.Catalog = Catalog;
        this.albumid = AlbumId;
        this.artistid = ArtistId;


	}

/*
	public String getArtist() {
		// TODO Auto-generated method stub
		return this.Artist;
	}


	public String getName() {
		// TODO Auto-generated method stub
		return this.Name;
	}


	public String getLocation() {
		// TODO Auto-generated method stub
		return this.Location;
	}
*/

}
// end::code[]
