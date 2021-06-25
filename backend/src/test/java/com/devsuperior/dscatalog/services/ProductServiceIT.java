package com.devsuperior.dscatalog.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.tests.Factory;

@SpringBootTest
@Transactional
public class ProductServiceIT {

	@Autowired
	ProductService service;
	
	@Autowired
	ProductRepository repository;
	
	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	private PageRequest page;
	private Page<ProductDTO> result;
	
	@BeforeEach
	void setUp() throws Exception{
		
		existingId = 1L;
		nonExistingId = 999L;
		countTotalProducts = 25L;
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenExisting() {
		
		ProductDTO dto = Factory.createdProductDTO();
		ProductDTO resultado = service.update(existingId, dto);
		
		Assertions.assertNotNull(resultado);
	}
	
	@Test
	public void findAllPagedShouldReturnSortedPageWhenSortByName() {
		
		page = PageRequest.of(0, 10, Sort.by("name"));
		result = service.findAllPaged(page);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals("Macbook Pro", result.getContent().get(0).getName());
		Assertions.assertEquals("PC Gamer", result.getContent().get(1).getName());		
		Assertions.assertEquals("PC Gamer Alfa", result.getContent().get(2).getName());		
	}
	
	@Test
	public void findAllPagedShouldReturnEmptyPageWhenPageDoesNotExists() {
		
		page = PageRequest.of(50, 10);
		result = service.findAllPaged(page);
		
		Assertions.assertTrue(result.isEmpty());		
	}
	
	@Test
	public void findAllPagedShouldReturnPaged() {
		
		page = PageRequest.of(0, 10);
		result = service.findAllPaged(page);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(0, result.getNumber());
		Assertions.assertEquals(10, result.getSize());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
		
	}
	
	@Test
	public void deleteShouldDeleteResourceWhenIdExists() {
		
		service.delete(existingId);
		
		Assertions.assertEquals(countTotalProducts - 1, repository.count());	
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});	
	}
}
