package gesis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SiteController {
	@RequestMapping("/")
	public String index() {
		return "pesquisa";
	}
	
	@RequestMapping("/pesquisa")
	public String pesquisa() {
		return "pesquisa";
	}
	
	@RequestMapping("/index")
	public String indexPage() {
		return "pesquisa";
	}
	
	@RequestMapping("/novo-sistema")
	public String novoSistema() {
		return "novo-sistema";
	}
	
	@RequestMapping("/altera-sistema")
	public String alteraSistema() {
		return "altera-sistema";
	}
}