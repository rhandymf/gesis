package gesis.bo;

import gesis.model.Sistema;
import gesis.repositories.SistemaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SistemaBO {
	
	@Autowired
	SistemaRepository sistemaRepository;
	
	public boolean validar(String email){
        boolean ehEmailValido = false;
        
        if (email != null && email.length() > 0) {
            String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";
            Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(email);
            if (matcher.matches()) {
                ehEmailValido = true;
            }
        }
        return ehEmailValido;
    }

	public List<Sistema> pesquisaSistemas(String descricaoPesquisa, String siglaPesquisa, String emailPesquisa) {
		
		List<Sistema> sistemas = new ArrayList<Sistema>();
		
		if(descricaoPesquisa != null && !descricaoPesquisa.isEmpty() && descricaoPesquisa.length() > 1){
			List<Sistema> sistemasDescricao = sistemaRepository.findByDescricaoContainingIgnoreCase(descricaoPesquisa);
			
			if(!sistemasDescricao.isEmpty()){
				for (Sistema sistema : sistemasDescricao) {
					if(!sistemas.contains(sistema)){
						sistemas.add(sistema);
					}
				}
			}
		}
		
		if(emailPesquisa != null && !emailPesquisa.isEmpty() && emailPesquisa.length() > 1){
			List<Sistema> sistemasEmail = sistemaRepository.findByEmailContainingIgnoreCase(emailPesquisa);
			
			if(!sistemasEmail.isEmpty()){
				for (Sistema sistema : sistemasEmail) {
					if(!sistemas.contains(sistema)){
						sistemas.add(sistema);
					}
				}
			}
		}
		
		if(siglaPesquisa != null && !siglaPesquisa.isEmpty() && siglaPesquisa.length() > 1){
			List<Sistema> sistemasSigla = sistemaRepository.findBySiglaContainingIgnoreCase(siglaPesquisa);
			
			if(!sistemasSigla.isEmpty()){
				for (Sistema sistema : sistemasSigla) {
					if(!sistemas.contains(sistema)){
						sistemas.add(sistema);
					}
				}
			}
		}
		
		return sistemas;
	}
}
