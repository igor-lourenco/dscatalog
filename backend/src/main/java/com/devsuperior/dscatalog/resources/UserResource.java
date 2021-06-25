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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.UserDTO;
import com.devsuperior.dscatalog.dto.UserInsertDTO;
import com.devsuperior.dscatalog.dto.UserUpdateDTO;
import com.devsuperior.dscatalog.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResource { //camada de controles
	
	@Autowired
	private UserService service;
	
	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable){ 
		Page<UserDTO> list = service.findAllPaged(pageable); //busca todos da lista da tabela UserDto trazido pela d serviço 
		return ResponseEntity.ok().body(list); //mostra no corpo da  página a lista buscada
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long id){ 
		UserDTO dto = service.findById(id); //busca da lista da tabela UserDto o id trazido pela d serviço passado como argumento 
		return ResponseEntity.ok().body(dto); //mostra no corpo da  página a entidade
	}
	
	@PostMapping
	public ResponseEntity<UserDTO> insert(@Valid @RequestBody UserInsertDTO dto){
		UserDTO newDto = service.insert(dto); //pega o parametro e manda pra classe insert do Service
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
		buildAndExpand(newDto.getId()).toUri();  //mostra no cabeçalho da resposta o endereço da entidade criada
		return ResponseEntity.created(uri).body(newDto); //mostra no corpo da página a entidade criada
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO dto){
		UserDTO newdto = service.update(id, dto); //pega os parametros e manda pra classe update do Service
		return ResponseEntity.ok().body(newdto); //mostra no corpo da página a entidade atualizada	
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<UserDTO> delete(@PathVariable Long id){
		service.delete(id); //pega o id e manda pra classe delete do Service
		return ResponseEntity.noContent().build(); 	
	}
}
