package com.devsuperior.dscatalog.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService { // camada de serviço

	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(Long categoryId,String name, Pageable pageable) {
		List<Category> cats = (categoryId == 0) ? null : Arrays.asList(categoryRepository.getOne(categoryId));
		Page<Product> list = repository.find(cats,name, pageable); // Busca todos os objetos da lista Product
		repository.findProductsWithCategories(list.getContent());
		return list.map(x -> new ProductDTO(x, x.getCategories())); // Converte os objetos da lista Product para lista ProductDto

	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id); // busca da tabela o objeto, ele vem como Optional
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException(" Id não existe")); // pega o objeto que tá no Optional e converte pra Product, caso não exista lança uma exceção
		return new ProductDTO(entity, entity.getCategories()); // converte o objeto entity para ProductDTO
	}

	@Transactional//(readOnly = true)
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product(); 
		copyDtoEntity(dto, entity);
		entity = repository.save(entity); 
		return new ProductDTO(entity); 
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {

		try {
			Product entity = repository.getOne(id); // cria a entidade do tipo Product e busca o id do tipo
			copyDtoEntity(dto, entity);									// CAtegoryDTO passado como parametro
			entity = repository.save(entity); // salva no banco
			return new ProductDTO(entity); // retorna uma nova entidade atualizada do tipo ProductDTO
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
	
	private void copyDtoEntity(ProductDTO dto, Product entity) {
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		entity.setPrice(dto.getPrice());
		
		entity.getCategories().clear();
		for (CategoryDTO catDto : dto.getCategories()) {
			Category category = categoryRepository.getOne(catDto.getId());
			entity.getCategories().add(category);
		}		
	}
}
