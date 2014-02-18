package models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.jpa.Model;

@Entity
public class AlertMessage extends Model {
	
    public Date timestamp;
 

    @ManyToOne	
	public Alert alert;
    
 
    
    @Column(columnDefinition="TEXT")
    public String description;
 	
	@Column(columnDefinition="TEXT")
    public String cite; 
    
    @Column(columnDefinition="TEXT")
    public String addressSt;
    @Column(columnDefinition="TEXT")
    public String addressBrgy;
    @Column(columnDefinition="TEXT")
    public String address;
    
    public String zipcode;
    public Date activeFrom;  
    
    @ManyToOne
    public Account account;
}




 
    
    
    
    
    
    
    
    