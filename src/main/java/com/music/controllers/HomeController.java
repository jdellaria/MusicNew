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
package com.music.controllers;

import org.springframework.stereotype.Controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.support.ServletContextResource;

import java.io.*;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import org.springframework.core.io.Resource;
import org.springframework.http.*;

import org.hibernate.Query;
import org.hibernate.Session;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import java.io.*;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;


import com.music.models.Album;
import com.music.models.AlbumDAO;
import com.music.models.Song;
import com.music.models.SongDAO;
import com.music.models.playQ;
import com.music.models.playQDAO;


/**
 * @author Jon Dellaria
 */
// tag::code[]
@Controller
public class HomeController {

	@Autowired
	private ServletContext servletContext;

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}

	@RequestMapping(
	  value = "/ex/foos",
	  method = RequestMethod.GET,
	  produces = "application/json"
	)
	@ResponseBody
	public String getFoosAsJsonFromREST() {
		System.out.println("Jons /ex/foos: ");
	    return "\nGet some Foos with Header New\n";
	}

	@RequestMapping(
	  value = "/ex/foos1/{id}",
	  method = RequestMethod.GET,
	  produces = "application/json"
	)
	@ResponseBody
	public String getFoosBySimplePathWithPathVariable(
	  @PathVariable("id") long id) {
		System.out.println("Jons /ex/foos1/{id}: " + id);
	    return "\nGet a specific Foo with id=" + id +"\n";
	}


	@RequestMapping(
	  value = "/ex/bars",
	  method = RequestMethod.GET,
	  produces = "application/json"
	)
	@ResponseBody
	public String getBarBySimplePathWithRequestParam(
	  @RequestParam("id") long id) {
		System.out.println("Jons /ex/bars: " + id);
	    return "\nGet a specific Bar with id=" + id +"\n";
	}

/*	@RequestMapping(
	  value = "/ex/2bars",
	  params = { "id", "second" },
	  method = GET)
	@ResponseBody
	public String getBarBySimplePathWithExplicitRequestParams(
	  @RequestParam("id") long id) {
	    return "Narrow Get a specific Bar with id=" + id + " second=" +second;
	}
*/

	@RequestMapping(
//	value = "/cover")
	value = "/cover",
	method = RequestMethod.GET)
	public void getImageAsByteArray1(
		@RequestParam("id") long id,
		HttpServletResponse response
		) throws IOException
	{


		Album myAlbum;
		System.out.println("Jons cover id: " + id);

		try {
			myAlbum = albumDAO.getAlbumById(id);
		}
		catch (Exception ex) {
			System.out.printf("Error getting album id: ");
			System.out.printf(ex.toString());
			return;// "Error getting album id: " + ex.toString();
		}


		System.out.printf("Album Details - Album's Cover: %s\n", myAlbum.getCover());



		String filePathString = myAlbum.getCover();
		System.out.println("Jons cover id from Web Page: " + filePathString);
		File f = new File(filePathString);
		if(!f.exists() && !f.isDirectory()) {
			filePathString = "/RAID/nocover.jpg";
		}
		OutputStream os = response.getOutputStream();
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		System.out.println("Jons cover id: " + filePathString);
		FileInputStream fin = new FileInputStream(filePathString);
		byte[] buf = new byte[4096];
		int count = 0;
		while(true)
		{
			int n = fin.read(buf);
			if(n == -1)
			{
				break;
			}
			count = count + n;
			os.write(buf,0,n);
		}
		os.flush();
		os.close();
		fin.close();
	}

/* Play Entire Ablum */
	@RequestMapping(
	value = "/playalbum",
	method = RequestMethod.GET)
	public void playAlbum(
		@RequestParam("id") long id,
		HttpServletResponse response
		) throws IOException
	{
		Album myAlbum;
		List<Song> songs;
		System.out.println("Jons playAlbum id: " + id);

		try {
			myAlbum = albumDAO.getAlbumById(id);
			songs = songDAO.getAllSongsInAlbumOrderByTrackNumberASC(id);
		}
		catch (Exception ex) {
			System.out.printf("Error getting album id: ");
			System.out.printf(ex.toString());
			return;// "Error getting album id: " + ex.toString();
		}


		System.out.printf("Album Details - Album's Name: %s\n", ( myAlbum).getAlbum());


		for (Song song : songs) {
			System.out.printf("Song Details - SongIndex: %d Album's Artist: %s - Name: %s - Location: %s\n", song.songindex, song.getArtist(), song.getName(), song.getLocation());
			playQ Q = new playQ(song.songindex);
			qDAO.add(Q);
		}
//		setSongsinPlayQ(songs);

	}


	/* Change The Volume Setting */
		@RequestMapping(
		value = "/volume",
		method = RequestMethod.GET)
		public void changeVolume(
			@RequestParam("id") long id,
			HttpServletResponse response
			) throws IOException
		{
			System.out.println("Jons volume setting is: " + id);

			String targetString = "volume " + id;
			try
			{
							// get a datagram socket
					DatagramSocket dsocket = new DatagramSocket();

							// send request
					byte[] buf = {'v', 'o', 'l', 'u', 'm', 'e', 0}; //new byte[256];
					byte[] volumeByteBuffer = new byte[20] ;
					volumeByteBuffer = targetString.getBytes();
//					InetAddress address = InetAddress.getByName("localhost");
					InetAddress address = InetAddress.getByName("192.168.19.2");
					DatagramPacket packet = new DatagramPacket(volumeByteBuffer, volumeByteBuffer.length, address, 1234);
					dsocket.send(packet);
					dsocket.close();

			}
			catch (Exception e)
			{
					System.err.println("Exception:  " + e);
			}
		}


  // Wire the UserDao used inside this controller.
  @Autowired
 private AlbumDAO albumDAO;
 @Autowired
  private SongDAO songDAO;
 @Autowired
  private playQDAO qDAO;
}
// end::code[]
