var personModel = function(id, name, age){
	var self = this;
	this.id = ko.observable(id);
	this.name = ko.observable(name);
	this.age = ko.observable(age);

	this.nameUpdate = ko.observable(false);
	this.ageUpdate = ko.observable(false);

	this.nameUpdating = function(){
		self.nameUpdate(true);
	};
	this.ageUpdating = function(){
		self.ageUpdate(true);
	};

};

var model = function(){

	var self = this;
	this.person_name = ko.observable("");
	this.person_age = ko.observable("");
	this.people = ko.observableArray([]);
	this.person_name_focus = ko.observable(true);

	this.createPerson = function(){
		if(self.validatePerson()){
		
			var person = {'name' : this.person_name(), 'age' : this.person_age()};
            var id = self.people().length;
            self.people.push(new personModel(id, self.person_name(), self.person_age()));
            self.person_name("");
            self.person_age("");		
            
            localStorage.setItem('people', ko.toJSON(self.people()));
			
		}else{
			alert("Name and age are required and age should be a number!");
		}
	};

	this.validatePerson = function(){
		if(self.person_name() !== "" && self.person_age() != "" && Number(self.person_age()) + 0 == self.person_age()){
			return true;
		}
		return false;
	};

	this.removePerson = function(person){
        
		self.people.remove(person);
		localStorage.setItem('people', ko.toJSON(self.people()));
	};


	this.updatePerson = function(person){

	    localStorage.setItem('people', ko.toJSON(self.people()));
	};

	this.loadData = function(){
		//fetch existing data from database		
		var people = localStorage.getItem('people');
        if(people){
            var data = JSON.parse(people);
            
            for(var x in data){
                var id = data[x]['id']
                var name = data[x]['name'];
                var age = data[x]['age'];
                self.people.push(new personModel(id, name, age));
            }
        }
	};
};

ko.applyBindings(new model());