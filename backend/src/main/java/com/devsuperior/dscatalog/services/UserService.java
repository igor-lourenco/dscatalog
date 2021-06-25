package com.devsuperior.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.RoleDTO;
import com.devsuperior.dscatalog.dto.UserDTO;
import com.devsuperior.dscatalog.dto.UserInsertDTO;
import com.devsuperior.dscatalog.dto.UserUpdateDTO;
import com.devsuperior.dscatalog.entities.Role;
import com.devsuperior.dscatalog.entities.User;
import com.devsuperior.dscatalog.repositories.RoleRepository;
import com.devsuperior.dscatalog.repositories.UserRepository;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService { // camada de serviço

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	private static Logger logger = LoggerFactory.getLogger(UserService.class);

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {
		Page<User> list = repository.findAll(pageable); // Busca todos os objetos da lista User
		return list.map(x -> new UserDTO(x)); // Converte os objetos da lista User para lista UserDto

	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id); // busca da tabela o objeto, ele vem como Optional
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException(" Id não existe")); // pega o objeto que tá no Optional e converte pra User, caso não exista lança uma exceção
		return new UserDTO(entity); // converte o objeto entity para UserDTO
	}

	@Transactional//(readOnly = true)
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User(); 
		copyDtoEntity(dto, entity);
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity = repository.save(entity); 
		return new UserDTO(entity); 
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {

		try {
			User entity = repository.getOne(id); // cria a entidade do tipo User e busca o id do tipo
			copyDtoEntity(dto, entity);									// CAtegoryDTO passado como parametro
			entity = repository.save(entity); // salva no banco
			return new UserDTO(entity); // retorna uma nova entidade atualizada do tipo UserDTO
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id não encontrado " + id);
		}
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id não existe " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade no banco");
		}
	}
	
	private void copyDtoEntity(UserDTO dto, User entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		
		entity.getRoles().clear();
		for (RoleDTO roleDto : dto.getRoles()) {
			Role role = roleRepository.getOne(roleDto.getId());
			entity.getRoles().add(role);
		}		
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);
		if(user == null) {
			logger.error("Usuário não encontrado: " + username);
			throw new UsernameNotFoundException("E-mail não existe");
		}
		logger.info("Usuário encontrado: " + username);
		return user;
	}
}
