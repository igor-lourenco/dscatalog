/*package com.devsuperior.dscatalog.resources;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.services.ProductService;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.tests.Factory;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ProductResource.class)
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper object;
	
	@MockBean
	private ProductService service;
	
	private Long existingId;
	private Long nonExistingId;
	private Long dependentId;
	private ProductDTO productDTO;
	private PageImpl<ProductDTO> page;
	 
	@BeforeEach
	void setUp() throws Exception{
		
		existingId = 1L;
		nonExistingId = 2L;
		dependentId = 3L;
		
		productDTO = Factory.createdProductDTO();
		page = new PageImpl<>(List.of(productDTO));
		
		Mockito.when(service.findAllPaged(ArgumentMatchers.any())).thenReturn(page); //quando chamar no service o findAllPAged com qualquer argumento, retorna um page do tipo PageImpl
		
		Mockito.when(service.findById(existingId)).thenReturn(productDTO);
		Mockito.when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(service.update(ArgumentMatchers.eq(existingId), ArgumentMatchers.any())).thenReturn(productDTO);
		Mockito.when(service.update(ArgumentMatchers.eq(nonExistingId), ArgumentMatchers.any())).thenThrow(ResourceNotFoundException.class);
	
		Mockito.when(service.insert(ArgumentMatchers.any())).thenReturn(productDTO);

		Mockito.doNothing().when(service).delete(existingId);
		Mockito.doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
		Mockito.doThrow(DatabaseException.class).when(service).delete(dependentId);
	}
	
	@Test
	public void deleteShouldNotFOundWhenIdDoesnotExists() throws Exception{
		
		ResultActions result = mockMvc.perform(delete("/products/{id}", nonExistingId));
		
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void deleteShouldReturnNoContentWhenIdExists() throws Exception{
		
		ResultActions result = mockMvc.perform(delete("/products/{id}", existingId));
		
		result.andExpect(status().isNoContent());

	}
	
	@Test
	public void insertShouldreturnProductDTOCreated() throws Exception{
		
		String jsonBody = object.writeValueAsString(productDTO);
		
		ResultActions result = mockMvc.perform(post("/products").content(jsonBody).
		                       contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON));	
		
		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
	}
	
	
	@Test
	public void updateShouldreturnProductDTOWhenIdExists() throws Exception{
		
		String jsonBody = object.writeValueAsString(productDTO);
		
		ResultActions result = mockMvc.perform(put("/products/{id}", existingId).content(jsonBody).
							   contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());

	}
	
	@Test
	public void updateShouldreturnNotFoundWhenIdDoesnotExists() throws Exception{
		
		String jsonBody = object.writeValueAsString(productDTO);
			
		ResultActions result = mockMvc.perform(put("/products/{id}", nonExistingId).content(jsonBody).
								contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON));
				
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void FindAllShouldReturnPage()throws Exception {
		
		ResultActions result = mockMvc.perform(get("/products").accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isOk());
	}
	
	@Test
	public void findByIdShouldreturnProductDTOWhenIdExists() throws Exception{
		
		ResultActions result = mockMvc.perform(get("/products/{id}", existingId).accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
	}
	
	@Test
	public void findByIdShouldreturnNotFOundWhenIdDoesnotExists() throws Exception{
		
		ResultActions result = mockMvc.perform(get("/products/{id}", nonExistingId).accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
	}
}*/
