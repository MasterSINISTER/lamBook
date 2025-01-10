package com.lambook.notebookApp.services;

import com.lambook.notebookApp.api.response.apiResponse;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Component

public class WeatherService {

    @Autowired
    @Bean
     RestTemplate restTemplate(){
        return new RestTemplate();
    }
    private static final String apiKey="8a4a71c567534dfae09bae31c60c8bb6";
    private static final String API="https://api.openweathermap.org/data/2.5/weather?q=CITY_NAME&appid=API_KEY";

    public apiResponse getWeather(String city){
        String finalAPI=API.replace("CITY_NAME",city).replace("API_KEY",apiKey);
        ResponseEntity<apiResponse> response = restTemplate().exchange(finalAPI, HttpMethod.GET, null, apiResponse.class);
        apiResponse body=response.getBody();
        return body;
    }
}
