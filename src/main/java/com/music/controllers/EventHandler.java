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

import static com.music.controllers.WebSocketConfiguration.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.music.models.Album;

/**
 * @author Jon Dellaria
 */
// tag::code[]
@Component
@RepositoryEventHandler(Album.class)
public class EventHandler {

	private final SimpMessagingTemplate websocket;

	private final EntityLinks entityLinks;

	@Autowired
	public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
		this.websocket = websocket;
		this.entityLinks = entityLinks;
	}

	@HandleAfterCreate
	public void newAlbum(Album Album) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/newAlbum", getPath(Album));
	}

	@HandleAfterDelete
	public void deleteAlbum(Album Album) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/deleteAlbum", getPath(Album));
	}

	@HandleAfterSave
	public void updateAlbum(Album Album) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/updateAlbum", getPath(Album));
	}

	/**
	 * Take an {@link Album} and get the URI using Spring Data REST's {@link EntityLinks}.
	 *
	 * @param Album
	 */
	private String getPath(Album Album) {
		return this.entityLinks.linkForSingleResource(Album.getClass(),	Album.getAlbumid()).toUri().getPath();
	}

}
// end::code[]
