package com.example.cerena.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class GeminiRequestBody {
    private List<Content> contents;
    private GenerationConfig generationConfig;
    
    public GeminiRequestBody(String prompt, InlineData inlineData) {
      if(inlineData == null)
        this.contents = List.of(new Content(List.of(new TextPart(prompt))));
      else
        this.contents = List.of(new Content(List.of(new TextPart(prompt), new InlinePart(inlineData))));

        this.generationConfig = new GenerationConfig("application/json");
    }

    @Getter @Setter
    @AllArgsConstructor
    public static class Content {
      private List<Part> parts;
    }
    public static abstract class Part {
    }
    @Getter @Setter
    @AllArgsConstructor
    public static class TextPart extends Part {
      private String text;
    }
    @Getter @Setter
    @AllArgsConstructor
    public static class InlinePart extends Part {
      private InlineData inlineData;
    }

    @Getter @Setter
    @AllArgsConstructor
    public static class GenerationConfig {
        private String responseMimeType;
      }
}
  