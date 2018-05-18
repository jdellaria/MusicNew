package com.music.models;
//package com.websystique.hibernate.model;
/**
 * @author Jon Dellaria
 */
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

//import com.websystique.hibernate.HibernateUtil;

import lombok.Data;
// tag::code[]
@Data
@Entity
@Table(name = "playq")
public class playQ {
	@Column(name = "id")
	@Id @GeneratedValue public long id;
	@Column(name = "songID")
    public long songID;
    @Column(name = "BeginPlayTime")
	public java.sql.Timestamp BeginPlayTime;
    @Column(name = "EndPlayTime")
	public java.sql.Timestamp EndPlayTime;
	@Column(name = "Status")
    public String status;
	@Column(name = "RequestType")
    public String requestType;
    @Column(name = "RequestTime", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	public java.sql.Timestamp requestTime;
	@Column(name = "Arrangement", columnDefinition="String default '99999999'")
    public String arrangement;

	private playQ() {
	}
	public playQ(long songID) {
		this.songID = songID;
		this.status = "In Queue";
		this.arrangement = "99999999";
		this.requestType = "Request";

	}
}
