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

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

/**
 * @author Jon Dellaria
 */
// tag::code[]

public interface AlbumRepository extends PagingAndSortingRepository<Album, Long> {

//@Query(value = "select * from album t where t.atristname = :artistname", nativeQuery=true)
//public Page findJon(@Param("artistname") String artistname, Pageable p);

public Page findByalbumStartsWithIgnoreCase(@Param("album") String album, Pageable p);

public Page findByartistnameStartsWithIgnoreCase(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCase(@Param("artistname") String artistname, Pageable p);

public Page findByartistnameStartsWithIgnoreCaseOrderByAlbumAsc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameStartsWithIgnoreCaseOrderByAlbumDesc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCaseOrderByAlbumAsc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCaseOrderByAlbumDesc(@Param("artistname") String artistname, Pageable p);

public Page findByartistnameStartsWithIgnoreCaseOrderBySongyearAsc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameStartsWithIgnoreCaseOrderBySongyearDesc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCaseOrderBySongyearAsc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCaseOrderBySongyearDesc(@Param("artistname") String artistname, Pageable p);

public Page findByartistnameStartsWithIgnoreCaseOrderByDateAddedAsc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameStartsWithIgnoreCaseOrderByDateAddedDesc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCaseOrderByDateAddedAsc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCaseOrderByDateAddedDesc(@Param("artistname") String artistname, Pageable p);

public Page findByartistnameStartsWithIgnoreCaseOrderByLastSelectedAsc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameStartsWithIgnoreCaseOrderByLastSelectedDesc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCaseOrderByLastSelectedAsc(@Param("artistname") String artistname, Pageable p);
public Page findByartistnameContainingIgnoreCaseOrderByLastSelectedDesc(@Param("artistname") String artistname, Pageable p);

//public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByAlbumAsc(@Param("album") String album, @Param("artistname") String artistname, Pageable p);
public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByAlbumAsc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);
public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByAlbumDesc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);

public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByArtistnameAsc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);
public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByArtistnameDesc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);


public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderBySongyearAsc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);
public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderBySongyearDesc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);

public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByDateAddedAsc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);
public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByDateAddedDesc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);

public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByLastSelectedAsc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);
public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCaseOrderByLastSelectedDesc(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);

public Page findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCase(@Param("artistname") String album, @Param("artistname") String artistname, Pageable p);

/*
public Page findByalbumOrartistnameOrDateAddedOrLastSelectedStartsWithIgnoreCase(@Param("album") String album, @Param("artistname") String artistname, @Param("dateAdded") String dateAdded, @Param("lastSelected")String lastSelected, Pageable p);
*/
}
// end::code[]
