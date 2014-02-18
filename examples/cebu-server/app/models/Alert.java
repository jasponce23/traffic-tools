package models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.jpa.Model;

@Entity
public class Alert extends Model {
	
    public String type;
    public String title;
    public String zipcode;
    public Date activeFrom;
    public Date activeTo;
    
    public Boolean publiclyVisible;
    
    public Double locationLat;
    public Double locationLon;

     /*public String address;
     public String cite;
    */
    @Column(columnDefinition="TEXT")
    public String description;

    @Column(columnDefinition="TEXT")
    public String publicDescription;
    
    @Column(columnDefinition="TEXT")
    public String addressSt;
    
    @Column(columnDefinition="TEXT")
    public String addressBrgy;
    
    @Column(columnDefinition="TEXT")
    public String address;
    
    @Column(columnDefinition="TEXT")
    public String cite;
    
    @ManyToOne
    public Account account;
    
}
