package api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import models.AlertMessage;



public class AlertMessageSimple {

    public Long id;
    public Date timestamp;
    public String addressSt;
    public String addressBrgy;
    public String address;
    public String zipcode;
    public String description;
    public String account;
    public Date activeFrom;

    public AlertMessageSimple(AlertMessage message)
    {
        this.id = message.id;
    	this.timestamp = message.timestamp;
        this.description = message.description;
        this.addressSt = message.addressSt;
        this.addressBrgy = message.addressBrgy;
        this.address = message.address;
        this.zipcode = message.zipcode;
        this.activeFrom = message.activeFrom;
        this.account = message.account.username;
    	
    }

  }





