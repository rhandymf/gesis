package gesis.repositories;

import gesis.model.Sistema;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SistemaRepository extends JpaRepository<Sistema, Long>{
	
	List<Sistema> findByDescricaoContainingIgnoreCaseOrSiglaContainingIgnoreCaseOrEmailContainingIgnoreCase(String descricao, String sigla, String email);
	
	List<Sistema> findByDescricaoContainingIgnoreCase(@Param("descricao")String descricao);
	
	List<Sistema> findBySiglaContainingIgnoreCase(@Param("sigla")String sigla);
	
	List<Sistema> findByEmailContainingIgnoreCase(@Param("email")String email);
	
	Sistema findOneBySigla(String sigla);
}
