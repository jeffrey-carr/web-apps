package dev.jeffreycarr.testapp.services;

import java.util.Random;
import org.springframework.stereotype.Component;

import dev.jeffreycarr.testapp.models.TemplateModel;

@Component
public class TemplateService {
  private Random random;

  public TemplateService() {
    this.random = new Random();
  }
  
  public TemplateModel test() {
    int code = random.nextInt(500);
    return new TemplateModel(code);
  }
}  