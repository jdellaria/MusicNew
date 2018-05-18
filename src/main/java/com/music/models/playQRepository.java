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
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
/**
 * @author Jon Dellaria
 */
// tag::code[]
public interface playQRepository extends PagingAndSortingRepository<playQ, Long> {

@Query("select u from playQ u where upper(u.status) like upper('curr%') or upper(u.status) like upper('in q%') or upper(u.status) like upper(:status)")
public Page findBystatusCurPlayInQ(@Param("status") String status, Pageable p);

public Page findBystatusStartsWithIgnoreCase(@Param("status") String status, Pageable p);

}
// end::code[]
