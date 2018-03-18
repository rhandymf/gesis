package gesis.controller;

import gesis.bo.SistemaBO;
import gesis.model.Sistema;
import gesis.repositories.SistemaRepository;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SistemaRestController {
	
	@Autowired
	SistemaRepository sistemaRepository;
	
	@Autowired
	SistemaBO sistemaBO;
	
	@GetMapping("/sistemas")
	public List<Sistema> getAllSistemas(){
		return sistemaRepository.findAll();
	}
	
	@GetMapping("/sistemas-pesquisar/{descricaoPesquisa}/{siglaPesquisa}/{emailPesquisa}")
	public List<Sistema> pesquisarSistemas(
			@PathVariable(value = "descricaoPesquisa") String descricaoPesquisa,
			@PathVariable(value = "siglaPesquisa") String siglaPesquisa,
			@PathVariable(value = "emailPesquisa") String emailPesquisa){
		
		List<Sistema> sistemas = sistemaBO.pesquisaSistemas(descricaoPesquisa, siglaPesquisa, emailPesquisa);
		
		return sistemas;
	}
	
	@PostMapping("/sistemas")
	public Sistema createSistema(@Valid @RequestBody Sistema sistema) {
	    return sistemaRepository.save(sistema);
	}
	
	@GetMapping("/sistemas/{id}")
	public ResponseEntity<Sistema> getSistemaById(@PathVariable(value = "id") Long sistemaId) {
	    Sistema sistema = sistemaRepository.findOne(sistemaId);
	    
	    if(sistema == null) {
	        return ResponseEntity.notFound().build();
	    }
	    
	    return ResponseEntity.ok().body(sistema);
	}
	
	@GetMapping("/sistema-sigla/{sigla}")
	public ResponseEntity<Sistema> getSistemaBySigla(@PathVariable(value = "sigla") String sigla) {
	    Sistema sistema = sistemaRepository.findOneBySigla(sigla);
	    
	    if(sistema == null) {
	        return ResponseEntity.notFound().build();
	    }
	    
	    return ResponseEntity.ok().body(sistema);
	}
	
	@PutMapping("/sistema-altera/{sigla}")
	public ResponseEntity<Sistema> updateSistemaSigla(@PathVariable(value = "sigla") String sigla, @Valid @RequestBody Sistema sistemaDetalhes) {
	    Sistema sistema = sistemaRepository.findOneBySigla(sigla);
	    
	    if(sistema == null) {
	        return ResponseEntity.notFound().build();
	    }
	    
	    if(!sistemaBO.validar(sistemaDetalhes.getEmail())){
	    	return ResponseEntity.noContent().build();
	    }
	    
	    sistema.setDescricao(sistemaDetalhes.getDescricao());
	    sistema.setSigla(sistemaDetalhes.getSigla());
	    sistema.setEmail(sistemaDetalhes.getEmail());
	    sistema.setUrl(sistemaDetalhes.getUrl());
	    sistema.setStatus(sistemaDetalhes.getStatus());
	    sistema.setUsuario(sistemaDetalhes.getUsuario());
	    sistema.setUltimaAlteracao(sistemaDetalhes.getNovaAlteracao());
	    sistema.setNovaAlteracao("");
	    sistema.setUpdatedAt(new Date());

	    Sistema updatedSistema = sistemaRepository.save(sistema);
	    
	    return ResponseEntity.ok(updatedSistema);
	}
	
	@PutMapping("/sistemas/{id}")
	public ResponseEntity<Sistema> updateSistema(@PathVariable(value = "id") Long sistemaId, @Valid @RequestBody Sistema sistemaDetalhes) {
	    Sistema sistema = sistemaRepository.findOne(sistemaId);
	    
	    if(sistema == null) {
	        return ResponseEntity.notFound().build();
	    }
	    
	    if(!sistemaBO.validar(sistemaDetalhes.getEmail())){
	    	return ResponseEntity.noContent().build();
	    }
	    
	    sistema.setDescricao(sistemaDetalhes.getDescricao());
	    sistema.setSigla(sistemaDetalhes.getSigla());
	    sistema.setEmail(sistemaDetalhes.getEmail());
	    sistema.setUrl(sistemaDetalhes.getUrl());
	    sistema.setStatus(sistemaDetalhes.getStatus());
	    sistema.setUltimaAlteracao(sistemaDetalhes.getNovaAlteracao());
	    sistema.setNovaAlteracao("");
	    sistema.setUpdatedAt(new Date());

	    Sistema updatedSistema = sistemaRepository.save(sistema);
	    
	    return ResponseEntity.ok(updatedSistema);
	}
	
	@DeleteMapping("/sistemas/{id}")
	public ResponseEntity<Sistema> deleteSistema(@PathVariable(value = "id") Long sistemaId) {
	    Sistema sistema = sistemaRepository.findOne(sistemaId);
	    if(sistema == null) {
	        return ResponseEntity.notFound().build();
	    }

	    sistemaRepository.delete(sistema);
	    return ResponseEntity.ok().build();
	}
}