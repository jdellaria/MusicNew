//package com.websystique.hibernate.model;
package com.music.models;
/**
 * @author Jon Dellaria
 */
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public class playQDAO{// implements IAlbumDAO {

	@PersistenceContext	
	private EntityManager entityManager;	
//	@Override
//	public Album getAlbumById(long AlbumId) {
//		return entityManager.find(SongLibrary.class, AlbumId);
//	}
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<SongLibrary> getAllSongsInAlbum(long AlbumId) {
//		String hql = "FROM SongLibrary where AlbumId = :code";
//		return (List<SongLibrary>) entityManager.createQuery(hql).setParameter("code", AlbumId).getResultList();
//	}	

	public void add(playQ q) {
		entityManager.persist(q);
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
