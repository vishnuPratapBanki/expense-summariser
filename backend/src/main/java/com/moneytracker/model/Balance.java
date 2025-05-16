
package com.moneytracker.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Balance {
    @Id
    private String id;
    private Double familyMoney;
    private Double hiddenSavings;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Double getFamilyMoney() { return familyMoney; }
    public void setFamilyMoney(Double familyMoney) { this.familyMoney = familyMoney; }
    public Double getHiddenSavings() { return hiddenSavings; }
    public void setHiddenSavings(Double hiddenSavings) { this.hiddenSavings = hiddenSavings; }
}
