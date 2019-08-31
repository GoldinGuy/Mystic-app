import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { eventsPage } from "./events.page";

describe("eventsPage", () => {
	let component: eventsPage;
	let fixture: ComponentFixture<eventsPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [eventsPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(eventsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
