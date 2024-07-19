package com.example.cerena.model.Medicine;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class FullMedicine {
    Medicine medicine;
    Generic generic;
}
