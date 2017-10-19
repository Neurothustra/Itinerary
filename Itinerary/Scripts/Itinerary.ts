/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />

class Itinerary {
    roleOptions: KnockoutObservableArray<string> = ko.observableArray(["Select", "Base", "Flyer", "Switch"]);
    classOptions: KnockoutObservableArray<string> = ko.observableArray([]);
    outputMessage: KnockoutObservable<string> = ko.observable("");
    itineraryList: Array<any> = null;
    listedRoles: KnockoutObservableArray<string> = ko.observableArray([]);
    listedRolesNum: number = null;
    roleOption: string = null;
    SessionOption: string = null;
    classOption1: string = null;
    classOption2: string = null;
    classOption3: string = null;
    classOption1Count: number = null;
    classOption2Count: number = null;
    classOption3Count: number = null;
    roleSelectId: string = null;

    attendeeName: KnockoutObservable<string> = ko.observable("");
    attendeeEmail: KnockoutObservable<string> = ko.observable("");

    friRoleOptions: KnockoutObservableArray<string> = ko.observableArray([]);
    friSelectedRoleOption: KnockoutObservable<string> = ko.observable("");
    friIntensiveOptions: KnockoutObservableArray<string> = ko.observableArray(["Select", "Icarian", "Bodyscapes", "Sports"]);
    friSelectedIntesiveOption: KnockoutObservable<string> = ko.observable("");

    satSelectedRoleOption1: KnockoutObservable<string> = ko.observable("");
    satSelectedRoleOption2: KnockoutObservable<string> = ko.observable("");
    satSelectedRoleOption3: KnockoutObservable<string> = ko.observable("");
    satSelectedRoleOption4: KnockoutObservable<string> = ko.observable("");
    satSection1Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Standing", "Poses"]);
    satSelectedSection1: KnockoutObservable<string> = ko.observable("");
    satSection2Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Yager", "Transitions", "Z-press"]);
    satSelectedSection2: KnockoutObservable<string> = ko.observable("");
    satSection3Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Spinning", "Junk"]);
    satSelectedSection3: KnockoutObservable<string> = ko.observable("");
    satSection4Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Cheeracro", "Handstand", "Slackro"]);
    satSelectedSection4: KnockoutObservable<string> = ko.observable("");

    sunSelectedRoleOption1: KnockoutObservable<string> = ko.observable("");
    sunSelectedRoleOption2: KnockoutObservable<string> = ko.observable("");
    sunSelectedRoleOption3: KnockoutObservable<string> = ko.observable("");
    sunSelectedRoleOption4: KnockoutObservable<string> = ko.observable("");
    sunSection1Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Knot", "Counterbalances"]);
    sunSelectedSection1: KnockoutObservable<string> = ko.observable("");
    sunSection2Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Pop", "Machines"]);
    sunSelectedSection2: KnockoutObservable<string> = ko.observable("");
    sunSection3Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Pitch", "Fancy", "Whip"]);
    sunSelectedSection3: KnockoutObservable<string> = ko.observable("");
    sunSection4Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Flow", "Structural"]);
    sunSelectedSection4: KnockoutObservable<string> = ko.observable("");

    monSelectedRoleOption1: KnockoutObservable<string> = ko.observable("");
    monSelectedRoleOption2: KnockoutObservable<string> = ko.observable("");
    monSelectedRoleOption3: KnockoutObservable<string> = ko.observable("");
    monSection1Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Triotastic", "Process"]);
    monSelectedSection1: KnockoutObservable<string> = ko.observable("");
    monSection2Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Free-Wheeling", "Handstands", "Popup"]);
    monSelectedSection2: KnockoutObservable<string> = ko.observable("");
    monSection3Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Office", "Think", "Thai"]);
    monSelectedSection3: KnockoutObservable<string> = ko.observable("");

    constructor() {
        let self = this;
        self.getItinerary();
    }

    itineraryData: any = {
        attendeeName: this.attendeeName,
        attendeeEmail: this.attendeeEmail,
        friSelectedRoleOption: this.friSelectedRoleOption,
        friSelectedIntesiveOption: this.friSelectedIntesiveOption,
        satSelectedRoleOption1: this.satSelectedRoleOption1,
        satSelectedRoleOption2: this.satSelectedRoleOption2,
        satSelectedRoleOption3: this.satSelectedRoleOption3,
        satSelectedRoleOption4: this.satSelectedRoleOption4,
        satSelectedSection1: this.satSelectedSection1,
        satSelectedSection2: this.satSelectedSection2,
        satSelectedSection3: this.satSelectedSection3,
        satSelectedSection4: this.satSelectedSection4,
        sunSelectedRoleOption1: this.sunSelectedRoleOption1,
        sunSelectedRoleOption2: this.sunSelectedRoleOption2,
        sunSelectedRoleOption3: this.sunSelectedRoleOption3,
        sunSelectedRoleOption4: this.sunSelectedRoleOption4,
        sunSelectedSection1: this.sunSelectedSection1,
        sunSelectedSection2: this.sunSelectedSection2,
        sunSelectedSection3: this.sunSelectedSection3,
        sunSelectedSection4: this.sunSelectedSection4,
        monSelectedRoleOption1: this.monSelectedRoleOption1,
        monSelectedRoleOption2: this.monSelectedRoleOption2,
        monSelectedRoleOption3: this.monSelectedRoleOption3,
        monSelectedSection1: this.monSelectedSection1,
        monSelectedSection2: this.monSelectedSection2,
        monSelectedSection3: this.monSelectedSection3
    }

    //getDay: shortened day name, getNum: # of sessions that day, target: target element class for generation
    buildItineraryForm(getDay: string, getNum: number, target: string): void {
        let columnWidth: string;
        let formString: any = "";

        switch (getNum) {
            case 3:
                columnWidth = "<div class='col-sm-4'>";
                break;
            case 4:
                columnWidth = "<div class='col-sm-3'>";
        }

        for (var i = 1; i < getNum + 1; i++) {
            formString += columnWidth + '<div style="font-weight: bold;">Session ' + i + '</div><hr /><div class="form-group"><label for="selectClass">Available Classes:</label><select id=' + getDay + i + 'session' + ' data-bind="options: ' + getDay + 'Section' + i + 'Options, value: ' + getDay + 'SelectedSection' + i + '" class="form-control selectClass"></select></div><div class="form-group"><label for="selectRoleType">Select role type:</label><select data-bind="options: roleOptions, value: ' + getDay + 'SelectedRoleOption' + i + '" id=' + getDay + i + 'roleType' + ' class="form-control selectRoleType"></select></div></div>';
        }

        $(target).html(formString);
    }

    //TODO:  use this to edit existing itineray date
    updateItinerary() {
        let self = this;
        self.roleAvailability();
    }

    setItinerary() {
        let initVal: string = $("tbody tr td span").text();

        if (initVal == "Select" || -1) {
            $("tbody tr td span").text(" --- ");
        }
    }

    postItinerary() {
        let self = this;
        self.outputMessage("Submitting itinerary...");

        $.ajax({
            type: "POST",
            url: "/api/Itineraries",//TODO: build demo data store
            data: ko.toJSON(self.itineraryData),
            contentType: "application/json",
            success: function (data) {
                self.outputMessage("Successfully submitted. Be sure to print your itinerary");
                self.getItinerary();
                $("button#printItinerary").removeAttr("disabled");
                $("button#submitItinerary").attr("disabled", "true");
                $("#printAlert").removeAttr("style");
            },
            error: function (error) {
                //self.outputMessage("Your itineray was not submitted: " + error.status + error.statusText + ". Please Try again.");
                self.outputMessage("Conection to API currently unavailable in this demo.");
            }
        });
    }

    getItinerary() {
        let self = this;

        $.ajax({
            type: "GET",
            url: "/api/Itineraries",//TODO: build demo data store
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //self.roleAvailability(self.itineraryList);
                self.itineraryList = data;
            },
            error: function (error) {
                //alert("Error " + error.status + ": Connection " + error.statusText);
                alert("Connection to API unavailable in this demo.");
            }
        });
    }

    //*roles are all called from the view
    friRole() {
        let self = this;

        self.roleOption = "friSelectedRoleOption";
        self.SessionOption = "friSelectedIntesiveOption";
        self.classOption1 = "Icarian";
        self.classOption2 = "Bodyscapes";
        self.classOption3 = "Sports";
        self.roleSelectId = "#friRoleType";

        self.roleAvailability();
    }

    sat1role() {
        let self = this;

        self.roleOption = "satSelectedRoleOption1";
        self.SessionOption = "satSelectedSection1";
        self.classOption1 = "Standing";
        self.classOption2 = "Poses";
        self.classOption3 = "Washing";
        self.roleSelectId = "#sat1roleType";

        self.roleAvailability();
    }

    sat2role() {
        let self = this;

        self.roleOption = "satSelectedRoleOption2";
        self.SessionOption = "satSelectedSection2";
        self.classOption1 = "Yager";
        self.classOption2 = "Transitions";
        self.classOption3 = "Z-press";
        self.roleSelectId = "#sat2roleType";

        self.roleAvailability();
    }

    sat3role() {
        let self = this;

        self.roleOption = "satSelectedRoleOption3";
        self.SessionOption = "satSelectedSection3";
        self.classOption1 = "Machine";
        self.classOption2 = "Spinning";
        self.classOption3 = "Junk";
        self.roleSelectId = "#sat3roleType";

        self.roleAvailability();
    }

    sat4role() {
        let self = this;

        self.roleOption = "satSelectedRoleOption4";
        self.SessionOption = "satSelectedSection4";
        self.classOption1 = "Cheeracro";
        self.classOption2 = "Handstand";
        self.classOption3 = "Slackro";
        self.roleSelectId = "#sat4roleType";

        self.roleAvailability();
    }

    sun1role() {
        let self = this;

        self.roleOption = "sunSelectedRoleOption1";
        self.SessionOption = "sunSelectedSection1";
        self.classOption1 = "Knot";
        self.classOption2 = "Counterbalances";
        self.classOption3 = "Hand";
        self.roleSelectId = "#sun4roleType";

        self.roleAvailability();
    }

    sun2role() {
        let self = this;

        self.roleOption = "sunSelectedRoleOption2";
        self.SessionOption = "sunSelectedSection2";
        self.classOption1 = "Icarian";
        self.classOption2 = "Pop";
        self.classOption3 = "Machines";
        self.roleSelectId = "#sun2roleType";

        self.roleAvailability();
    }

    sun3role() {
        let self = this;

        self.roleOption = "sunSelectedRoleOption3";
        self.SessionOption = "sunSelectedSection3";
        self.classOption1 = "Pitch";
        self.classOption2 = "Fancy";
        self.classOption3 = "Whip";
        self.roleSelectId = "#sun3roleType";

        self.roleAvailability();
    }

    sun4role() {
        let self = this;

        self.roleOption = "sunSelectedRoleOption4";
        self.SessionOption = "sunSelectedSection4";
        self.classOption1 = "Inlocate";
        self.classOption2 = "Flow";
        self.classOption3 = "Structural";
        self.roleSelectId = "#sun4roleType";

        self.roleAvailability();
    }

    mon1role() {
        let self = this;

        self.roleOption = "monSelectedRoleOption1";
        self.SessionOption = "monSelectedSection1";
        self.classOption1 = "Jump";
        self.classOption2 = "Triotastic";
        self.classOption3 = "Process";
        self.roleSelectId = "#mon1roleType";

        self.roleAvailability();
    }

    mon2role() {
        let self = this;

        self.roleOption = "monSelectedRoleOption2";
        self.SessionOption = "monSelectedSection2";
        self.classOption1 = "Free-Wheeling";
        self.classOption2 = "Handstands";
        self.classOption3 = "Popup";
        self.roleSelectId = "#mon2roleType";

        self.roleAvailability();
    }

    mon3role() {
        let self = this;

        self.roleOption = "monSelectedRoleOption3";
        self.SessionOption = "monSelectedSection3";
        self.classOption1 = "Office";
        self.classOption2 = "Think";
        self.classOption3 = "Thai";
        self.roleSelectId = "#mon3roleType";

        self.roleAvailability();
    }

    roleAvailability() {
        let self = this;

        let obj = self.itineraryList;
        let session = this.SessionOption;
        let rolesList: Array<string> = [];
        let rolesNum: number = null;
        let base: number = null;
        let flyer: number = null;
        let swtch: number = null;//spelled wrong deliberately to avoid keyword conflict



        if (obj !== null) {
            for (var i = 0; i < obj.length; i++) {
                rolesList.push(obj[i][self.roleOption]);

                switch (obj[i][self.SessionOption]) {
                    case self.classOption1:
                        break;
                    case self.classOption2:
                        break;
                    case self.classOption3:
                        break;
                }
            }
        }

        if (base > 15) {
            $(self.roleSelectId).find("[value='Base'").remove();
            $(self.roleSelectId).append($('<option disabled>').val("No Base").html("Base roles unavailable for this class"));
        }

        if (flyer > 10) {
            $(self.roleSelectId).find("[value='Flyer'").remove();
            $(self.roleSelectId).append($('<option disabled>').val("Flyer").html("Flyer roles unavailable for this class"));
        }

        if (swtch > 5) {
            $(self.roleSelectId).find("[value='Switch'").remove();
            $(self.roleSelectId).append($('<option disabled>').val("Switch").html("Switch roles unavailable for this class"));
        }
    }
}
