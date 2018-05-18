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
//package com.websystique.hibernate.model;


import java.sql.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

//import com.greglturnquist.payroll.HibernateUtil;

import lombok.Data;

/**
 * @author Jon Dellaria
 */
// tag::code[]
@Data
@Entity
@Table(name = "Albums")
public class Album {

	@Column(name = "Album")
	public String album;
	@Column(name = "AlbumId")
	public @Id @GeneratedValue Long albumid;
	@Column(name = "DateAdded")
	public java.sql.Timestamp dateAdded;
	@Column(name = "LastSelected")
	public java.sql.Timestamp lastSelected;
	@OneToMany(mappedBy = "albumid")
	public Set<Song> songs = new HashSet<Song>();
	@Column(name = "Cover")
	public String cover;
	@Column(name = "ArtistName")
	public String artistname;
	@Column(name = "SongYear")
	public String songyear;
	public Album() {}

/*	public List<Song> getSongsInAlbum(long AlbumId) {
	Session session = HibernateUtil.getSessionFactory().openSession();
	session.beginTransaction();

	Query query = session.createQuery("from Song where AlbumId = :code ");
	query.setParameter("code", AlbumId);
	List<Song> songs = (List<Song>) query.list();

	session.getTransaction().commit();
	session.close();

	return songs;

	}*/


	public Album(String Album, Long AlbumId, java.sql.Timestamp DateAdded, java.sql.Timestamp LastSelected) {
		this.album = Album;
		this.albumid = AlbumId;
		this.dateAdded = DateAdded;
		this.lastSelected = LastSelected;
	}

	public String getAlbum() {
		// TODO Auto-generated method stub
		return this.album;
	}

	public Long getAlbumid() {
		// TODO Auto-generated method stub
		return this.albumid;
	}
}
// end::code[]
