package com.devsuperior.dscatalog.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.tests.Factory;

@DataJpaTest
public class ProductRepositoryTests {

	@Autowired
	private ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;

	@BeforeEach
	void setUpBeforeClass() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
	}

	@Test // Método save Deveria Persistir Com Incremento Automático Quando o Id for nulo
	public void saveShouldPersistWithAutoincrementWhenIdIsNull() {

		Product product = Factory.createdProduct();
		product.setId(null);

		product = repository.save(product);

		Assertions.assertNotNull(product.getId()); // testa se o Id criado não é nulo
		Assertions.assertEquals(countTotalProducts + 1, product.getId()); // testa se o Id salvo é igual ao id total do
																			// produtos + 1
	}

	@Test // Método delete Deve Deletar Objeto Quando Id Existir
	public void deleteShouldDeleteObjectWhenIdExists() {

		repository.deleteById(existingId); // deleta o id do banco

		Optional<Product> result = repository.findById(existingId); // chama o id e tem que retornar um optional vazio
		Assertions.assertFalse(result.isPresent()); // testa se não está presente algum objeto na variavel
	}

	@Test // Método delete Deve Lançar Uma Exceçao Quando Id Não Existir
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {

		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}

	@Test // Método findById deveria retornar id quando o id existir
	public void findByIdShouldReturnNonEmptyOptionalWhenIdExist() {

		Optional<Product> result = repository.findById(existingId);

		Assertions.assertTrue(result.isPresent());
	}

	@Test // Método não deveria retornar id quando a id não existe
	public void findByIdShouldReturnEmptyOptionalWhenIdDoesNotExist() {

		Optional<Product> result = repository.findById(nonExistingId);
		
		Assertions.assertTrue(result.isEmpty());
	}
}
