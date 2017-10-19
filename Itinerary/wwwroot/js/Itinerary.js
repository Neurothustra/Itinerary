var Itinerary = (function () {
    function Itinerary() {
        this.roleOptions = ko.observableArray(["Select", "Base", "Flyer", "Switch"]);
        this.classOptions = ko.observableArray([]);
        this.outputMessage = ko.observable("");
        this.itineraryList = null;
        this.listedRoles = ko.observableArray([]);
        this.listedRolesNum = null;
        this.roleOption = null;
        this.SessionOption = null;
        this.classOption1 = null;
        this.classOption2 = null;
        this.classOption3 = null;
        this.classOption1Count = null;
        this.classOption2Count = null;
        this.classOption3Count = null;
        this.roleSelectId = null;
        this.attendeeName = ko.observable("");
        this.attendeeEmail = ko.observable("");
        this.friRoleOptions = ko.observableArray([]);
        this.friSelectedRoleOption = ko.observable("");
        this.friIntensiveOptions = ko.observableArray(["Select", "Icarian", "Bodyscapes", "Sports"]);
        this.friSelectedIntesiveOption = ko.observable("");
        this.satSelectedRoleOption1 = ko.observable("");
        this.satSelectedRoleOption2 = ko.observable("");
        this.satSelectedRoleOption3 = ko.observable("");
        this.satSelectedRoleOption4 = ko.observable("");
        this.satSection1Options = ko.observableArray(["Select", "Standing", "Poses"]);
        this.satSelectedSection1 = ko.observable("");
        this.satSection2Options = ko.observableArray(["Select", "Yager", "Transitions", "Z-press"]);
        this.satSelectedSection2 = ko.observable("");
        this.satSection3Options = ko.observableArray(["Select", "Spinning", "Junk"]);
        this.satSelectedSection3 = ko.observable("");
        this.satSection4Options = ko.observableArray(["Select", "Cheeracro", "Handstand", "Slackro"]);
        this.satSelectedSection4 = ko.observable("");
        this.sunSelectedRoleOption1 = ko.observable("");
        this.sunSelectedRoleOption2 = ko.observable("");
        this.sunSelectedRoleOption3 = ko.observable("");
        this.sunSelectedRoleOption4 = ko.observable("");
        this.sunSection1Options = ko.observableArray(["Select", "Knot", "Counterbalances"]);
        this.sunSelectedSection1 = ko.observable("");
        this.sunSection2Options = ko.observableArray(["Select", "Pop", "Machines"]);
        this.sunSelectedSection2 = ko.observable("");
        this.sunSection3Options = ko.observableArray(["Select", "Pitch", "Fancy", "Whip"]);
        this.sunSelectedSection3 = ko.observable("");
        this.sunSection4Options = ko.observableArray(["Select", "Flow", "Structural"]);
        this.sunSelectedSection4 = ko.observable("");
        this.monSelectedRoleOption1 = ko.observable("");
        this.monSelectedRoleOption2 = ko.observable("");
        this.monSelectedRoleOption3 = ko.observable("");
        this.monSection1Options = ko.observableArray(["Select", "Triotastic", "Process"]);
        this.monSelectedSection1 = ko.observable("");
        this.monSection2Options = ko.observableArray(["Select", "Free-Wheeling", "Handstands", "Popup"]);
        this.monSelectedSection2 = ko.observable("");
        this.monSection3Options = ko.observableArray(["Select", "Office", "Think", "Thai"]);
        this.monSelectedSection3 = ko.observable("");
        this.itineraryData = {
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
        };
        var self = this;
        self.getItinerary();
    }
    Itinerary.prototype.buildItineraryForm = function (getDay, getNum, target) {
        var columnWidth;
        var formString = "";
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
    };
    Itinerary.prototype.updateItinerary = function () {
        var self = this;
        self.roleAvailability();
    };
    Itinerary.prototype.setItinerary = function () {
        var initVal = $("tbody tr td span").text();
        if (initVal == "Select" || -1) {
            $("tbody tr td span").text(" --- ");
        }
    };
    Itinerary.prototype.postItinerary = function () {
        var self = this;
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
                self.outputMessage("Conection to API currently unavailable in this demo.");
            }
        });
    };
    Itinerary.prototype.getItinerary = function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: "/api/Itineraries",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                self.itineraryList = data;
            },
            error: function (error) {
                alert("Connection to API unavailable in this demo.");
            }
        });
    };
    Itinerary.prototype.friRole = function () {
        var self = this;
        self.roleOption = "friSelectedRoleOption";
        self.SessionOption = "friSelectedIntesiveOption";
        self.classOption1 = "Icarian";
        self.classOption2 = "Bodyscapes";
        self.classOption3 = "Sports";
        self.roleSelectId = "#friRoleType";
        self.roleAvailability();
    };
    Itinerary.prototype.sat1role = function () {
        var self = this;
        self.roleOption = "satSelectedRoleOption1";
        self.SessionOption = "satSelectedSection1";
        self.classOption1 = "Standing";
        self.classOption2 = "Poses";
        self.classOption3 = "Washing";
        self.roleSelectId = "#sat1roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.sat2role = function () {
        var self = this;
        self.roleOption = "satSelectedRoleOption2";
        self.SessionOption = "satSelectedSection2";
        self.classOption1 = "Yager";
        self.classOption2 = "Transitions";
        self.classOption3 = "Z-press";
        self.roleSelectId = "#sat2roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.sat3role = function () {
        var self = this;
        self.roleOption = "satSelectedRoleOption3";
        self.SessionOption = "satSelectedSection3";
        self.classOption1 = "Machine";
        self.classOption2 = "Spinning";
        self.classOption3 = "Junk";
        self.roleSelectId = "#sat3roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.sat4role = function () {
        var self = this;
        self.roleOption = "satSelectedRoleOption4";
        self.SessionOption = "satSelectedSection4";
        self.classOption1 = "Cheeracro";
        self.classOption2 = "Handstand";
        self.classOption3 = "Slackro";
        self.roleSelectId = "#sat4roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.sun1role = function () {
        var self = this;
        self.roleOption = "sunSelectedRoleOption1";
        self.SessionOption = "sunSelectedSection1";
        self.classOption1 = "Knot";
        self.classOption2 = "Counterbalances";
        self.classOption3 = "Hand";
        self.roleSelectId = "#sun4roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.sun2role = function () {
        var self = this;
        self.roleOption = "sunSelectedRoleOption2";
        self.SessionOption = "sunSelectedSection2";
        self.classOption1 = "Icarian";
        self.classOption2 = "Pop";
        self.classOption3 = "Machines";
        self.roleSelectId = "#sun2roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.sun3role = function () {
        var self = this;
        self.roleOption = "sunSelectedRoleOption3";
        self.SessionOption = "sunSelectedSection3";
        self.classOption1 = "Pitch";
        self.classOption2 = "Fancy";
        self.classOption3 = "Whip";
        self.roleSelectId = "#sun3roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.sun4role = function () {
        var self = this;
        self.roleOption = "sunSelectedRoleOption4";
        self.SessionOption = "sunSelectedSection4";
        self.classOption1 = "Inlocate";
        self.classOption2 = "Flow";
        self.classOption3 = "Structural";
        self.roleSelectId = "#sun4roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.mon1role = function () {
        var self = this;
        self.roleOption = "monSelectedRoleOption1";
        self.SessionOption = "monSelectedSection1";
        self.classOption1 = "Jump";
        self.classOption2 = "Triotastic";
        self.classOption3 = "Process";
        self.roleSelectId = "#mon1roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.mon2role = function () {
        var self = this;
        self.roleOption = "monSelectedRoleOption2";
        self.SessionOption = "monSelectedSection2";
        self.classOption1 = "Free-Wheeling";
        self.classOption2 = "Handstands";
        self.classOption3 = "Popup";
        self.roleSelectId = "#mon2roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.mon3role = function () {
        var self = this;
        self.roleOption = "monSelectedRoleOption3";
        self.SessionOption = "monSelectedSection3";
        self.classOption1 = "Office";
        self.classOption2 = "Think";
        self.classOption3 = "Thai";
        self.roleSelectId = "#mon3roleType";
        self.roleAvailability();
    };
    Itinerary.prototype.roleAvailability = function () {
        var self = this;
        var obj = self.itineraryList;
        var session = this.SessionOption;
        var rolesList = [];
        var rolesNum = null;
        var base = null;
        var flyer = null;
        var swtch = null;
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
    };
    return Itinerary;
}());
//# sourceMappingURL=Itinerary.js.map