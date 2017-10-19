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
    friIntensiveOptions: KnockoutObservableArray<string> = ko.observableArray(["Select", "Icarian Enthusiasts Unite (Jon Rea & Kaija)", "Acro Montreal Bodyscapes flow (Jill Cambell)", "Sports Acro 201 (Brian Kincher)"]);
    friSelectedIntesiveOption: KnockoutObservable<string> = ko.observable("");

    satSelectedRoleOption1: KnockoutObservable<string> = ko.observable("");
    satSelectedRoleOption2: KnockoutObservable<string> = ko.observable("");
    satSelectedRoleOption3: KnockoutObservable<string> = ko.observable("");
    satSelectedRoleOption4: KnockoutObservable<string> = ko.observable("");
    satSection1Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Standing Acro Mounts (Brian Kincher)", "Standing Poses (Micah & Monica)"]);
    satSelectedSection1: KnockoutObservable<string> = ko.observable("");
    satSection2Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Yager to Bird - the Illusion Revealed (Flips)", "Dynamic Transitions (Andre & Serena)", "Z-press, z-press, z-press (Jill Campbell)"]);
    satSelectedSection2: KnockoutObservable<string> = ko.observable("");
    satSection3Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Spinning & Popping Machine! (Acro Superheroes)", "Junk in the trunk (Eleanor Bramwell)"]);
    satSelectedSection3: KnockoutObservable<string> = ko.observable("");
    satSection4Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Group style Cheeracro (Flips)", "All The Handstand Nation Machines (Reno & Sariah)", "Slackro the Basics (Rob Newman)"]);
    satSelectedSection4: KnockoutObservable<string> = ko.observable("");

    sunSelectedRoleOption1: KnockoutObservable<string> = ko.observable("");
    sunSelectedRoleOption2: KnockoutObservable<string> = ko.observable("");
    sunSelectedRoleOption3: KnockoutObservable<string> = ko.observable("");
    sunSelectedRoleOption4: KnockoutObservable<string> = ko.observable("");
    sunSection1Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "2 to 1 Handstand or Knot (Brian Kincher)", "Creative Counterbalances (Jill Campbell)"]);
    sunSelectedSection1: KnockoutObservable<string> = ko.observable("");
    sunSection2Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Pop it Like it's Hot (Josh & Lizzy)", "Large Group Washing Machines (Shana & Company)"]);
    sunSelectedSection2: KnockoutObservable<string> = ko.observable("");
    sunSection3Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Toe Pitch FUNdamentals (Micha & Monica)", "Fancy Footwork (Ben & Joy)", "Whip It Up (Josh & Lizzy)"]);
    sunSelectedSection3: KnockoutObservable<string> = ko.observable("");
    sunSection4Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Slackro the Flow (Rob Newman)", "Increasing structural integrity (Joy Carey)"]);
    sunSelectedSection4: KnockoutObservable<string> = ko.observable("");

    monSelectedRoleOption1: KnockoutObservable<string> = ko.observable("");
    monSelectedRoleOption2: KnockoutObservable<string> = ko.observable("");
    monSelectedRoleOption3: KnockoutObservable<string> = ko.observable("");
    monSection1Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Triotastic (Candace & Ryan)", "The Creative Process (Serena & Andre)"]);
    monSelectedSection1: KnockoutObservable<string> = ko.observable("");
    monSection2Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Free-Wheeling Hand2Hand (Ben & Joy)", "Handstands (Nathan Price)", "Whip + Pop (Micki & Jeremy)"]);
    monSelectedSection2: KnockoutObservable<string> = ko.observable("");
    monSection3Options: KnockoutObservableArray<string> = ko.observableArray(["Select", "Office hours (Brian Kincher)", "Oooh I think that I found myself some cheerleader(s) (Monica & Micah)", "Thai me up (Eric and Dion)"]);
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
            url: "/api/Itineraries",
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
                self.outputMessage("Your itineray was not submitted [" + error.status + error.statusText + ". Please Try again.");
            }
        });
    }

    getItinerary() {
        let self = this;

        $.ajax({
            type: "GET",
            url: "/api/Itineraries",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //self.roleAvailability(self.itineraryList);
                self.itineraryList = data;
            },
            error: function (error) {
                alert(error.status + "<--and--> " + error.statusText);
            }
        });
    }

    //*role are all called from the view
    friRole() {
        let self = this;

        self.roleOption = "friSelectedRoleOption";
        self.SessionOption = "friSelectedIntesiveOption";
        self.classOption1 = "Icarian Enthusiasts Unite (Jon Rea & Kaija)";
        self.classOption2 = "Acro Montreal Bodyscapes flow (Jill Cambell)";
        self.classOption3 = "Sports Acro 201 (Brian Kincher)";
        self.roleSelectId = "#friRoleType";

        self.roleAvailability();
    }

    sat1role() {
        let self = this;

        self.roleOption = "satSelectedRoleOption1";
        self.SessionOption = "satSelectedSection1";
        self.classOption1 = "Standing Acro Mounts (Brian Kincher)";
        self.classOption2 = "Standing Poses (Jill Campbell)";
        self.classOption3 = "Stupid f**king fun washing machines (Sariah and Reno)";
        self.roleSelectId = "#sat1roleType";

        self.roleAvailability();
    }

    sat2role() {
        let self = this;

        self.roleOption = "satSelectedRoleOption2";
        self.SessionOption = "satSelectedSection2";
        self.classOption1 = "Yager to Bird - the Illusion Revealed (Flips)";
        self.classOption2 = "Dynamic Transitions (Andre & Serena)";
        self.classOption3 = "Z-press, z-press, z-press (Jill Campbell)";
        self.roleSelectId = "#sat2roleType";

        self.roleAvailability();
    }

    sat3role() {
        let self = this;

        self.roleOption = "satSelectedRoleOption3";
        self.SessionOption = "satSelectedSection3";
        self.classOption1 = "Pop Machine (Jon & Kaia)";
        self.classOption2 = "Spinning & Popping Machine! (Acro Superheroes)";
        self.classOption3 = "Junk in the trunk (Eleanor Bramwell)";
        self.roleSelectId = "#sat3roleType";

        self.roleAvailability();
    }

    sat4role() {
        let self = this;

        self.roleOption = "satSelectedRoleOption4";
        self.SessionOption = "satSelectedSection4";
        self.classOption1 = "Group style Cheeracro (Flips)";
        self.classOption2 = "All The Handstand Nation Machines (Reno & Sariah)";
        self.classOption3 = "Slackro the Basics (Rob Newman)";
        self.roleSelectId = "#sat4roleType";

        self.roleAvailability();
    }

    sun1role() {
        let self = this;

        self.roleOption = "sunSelectedRoleOption1";
        self.SessionOption = "sunSelectedSection1";
        self.classOption1 = "2 to 1 Handstand or Knot (Brian Kincher)";
        self.classOption2 = "Creative Counterbalances (Jill Campbell)";
        self.classOption3 = "Hand To Hand (Acro Superheroes)";
        self.roleSelectId = "#sun4roleType";

        self.roleAvailability();
    }

    sun2role() {
        let self = this;

        self.roleOption = "sunSelectedRoleOption2";
        self.SessionOption = "sunSelectedSection2";
        self.classOption1 = "Icarian Games (Jon & Kaija)";
        self.classOption2 = "Pop it Like it's Hot (Josh & Lizzy)";
        self.classOption3 = "Large Group Washing Machines (Shana & Company)";
        self.roleSelectId = "#sun2roleType";

        self.roleAvailability();
    }

    sun3role() {
        let self = this;

        self.roleOption = "sunSelectedRoleOption3";
        self.SessionOption = "sunSelectedSection3";
        self.classOption1 = "Toe Pitch FUNdamentals (Micha & Monica)";
        self.classOption2 = "Fancy Footwork (Ben & Joy)";
        self.classOption3 = "Whip It Up (Josh & Lizzy)";
        self.roleSelectId = "#sun3roleType";

        self.roleAvailability();
    }

    sun4role() {
        let self = this;

        self.roleOption = "sunSelectedRoleOption4";
        self.SessionOption = "sunSelectedSection4";
        self.classOption1 = "Inlocate (Nathan Price)";
        self.classOption2 = "Slackro the Flow (Rob Newman)";
        self.classOption3 = "Increasing structural integrity (Joy Carey)";
        self.roleSelectId = "#sun4roleType";

        self.roleAvailability();
    }

    mon1role() {
        let self = this;

        self.roleOption = "monSelectedRoleOption1";
        self.SessionOption = "monSelectedSection1";
        self.classOption1 = "Jump To Hand to Hand (Nathan Price)";
        self.classOption2 = "Triotastic (Candace & Ryan)";
        self.classOption3 = "The Creative Process (Serena & Andre)";
        self.roleSelectId = "#mon1roleType";

        self.roleAvailability();
    }

    mon2role() {
        let self = this;

        self.roleOption = "monSelectedRoleOption2";
        self.SessionOption = "monSelectedSection2";
        self.classOption1 = "Free-Wheeling Hand2Hand (Ben & Joy)";
        self.classOption2 = "Handstands (Nathan Price)";
        self.classOption3 = "Whip + Pop (Micki & Jeremy)";
        self.roleSelectId = "#mon2roleType";

        self.roleAvailability();
    }

    mon3role() {
        let self = this;

        self.roleOption = "monSelectedRoleOption3";
        self.SessionOption = "monSelectedSection3";
        self.classOption1 = "Office hours (Brian Kincher)";
        self.classOption2 = "Oooh I think that I found myself some cheerleader(s) (Monica & Micah)";
        self.classOption3 = "Thai me up (Eric and Dion)";
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
