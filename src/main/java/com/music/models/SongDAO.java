//package com.websystique.hibernate.model;
package com.music.models;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.music.models.Song;

@Transactional
@Repository
public class SongDAO{// implements IAlbumDAO {

	@PersistenceContext
	private EntityManager entityManager;
//	@Override
//	public Album getAlbumById(long AlbumId) {
//		return entityManager.find(Song.class, AlbumId);
//	}
//	@SuppressWarnings("unchecked")
//	@Override
	public List<Song> getAllSongsInAlbumOrderByTrackNumberASC(long AlbumId) {
		String hql = "Select s FROM Song s where s.albumid = "  + AlbumId + " order by s.tracknumber asc"  ;
		return (List<Song>) entityManager.createQuery(hql).getResultList();

	}
	/*	@Override
	public void addArticle(Article article) {
		entityManager.persist(article);
	}
	@Override
	public void updateArticle(Article article) {
		Article artcl = getArticleById(article.getArticleId());
		artcl.setTitle(article.getTitle());
		artcl.setCategory(article.getCategory());
		entityManager.flush();
	}
	@Override
	public void deleteArticle(int articleId) {
		entityManager.remove(getArticleById(articleId));
	}
	@Override
	public boolean articleExists(String title, String category) {
		String hql = "FROM Article as atcl WHERE atcl.title = ? and atcl.category = ?";
		int count = entityManager.createQuery(hql).setParameter(1, title)
		              .setParameter(2, category).getResultList().size();
		return count > 0 ? true : false;
	}*/

}
