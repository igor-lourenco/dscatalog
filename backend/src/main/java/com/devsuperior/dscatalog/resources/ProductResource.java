package com.devsuperior.dscatalog.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.services.ProductService;

@RestController
@RequestMapping(value = "/products")
public class ProductResource { //camada de controles
	
	@Autowired
	private ProductService service;
	
	@GetMapping
	public ResponseEntity<Page<ProductDTO>> findAll(Pageable pageable,
			@RequestParam(value = "categoryId",  defaultValue = "0") Long categoryId,
			@RequestParam(value = "name",  defaultValue = "") String name){ 
		Page<ProductDTO> list = service.findAllPaged(categoryId, name.trim(), pageable); //busca todos da lista da tabela ProductDto trazido pela d serviço 
		return ResponseEntity.ok().body(list); //mostra no corpo da  página a lista buscada
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> findById(@PathVariable Long id){ 
		ProductDTO dto = service.findById(id); //busca da lista da tabela ProductDto o id trazido pela d serviço passado como argumento 
		return ResponseEntity.ok().body(dto); //mostra no corpo da  página a entidade
	}
	
	@PostMapping
	public ResponseEntity<ProductDTO> insert(@Valid @RequestBody ProductDTO dto){
		dto = service.insert(dto); //pega o parametro e manda pra classe insert do Service
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
		buildAndExpand(dto.getId()).toUri();  //mostra no cabeçalho da resposta o endereço da entidade criada
		return ResponseEntity.created(uri).body(dto); //mostra no corpo da página a entidade criada
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long id, @Valid @RequestBody ProductDTO dto){
		dto = service.update(id, dto); //pega os parametros e manda pra classe update do Service
		return ResponseEntity.ok().body(dto); //mostra no corpo da página a entidade atualizada	
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> delete(@PathVariable Long id){
		service.delete(id); //pega o id e manda pra classe delete do Service
		return ResponseEntity.noContent().build(); 	
	}
}
