@regression
Feature: Footer


    Scenario: Footer should display the correct information and be visible
        Given I navigate to the ShareValue homepage
        Then I see "4" information containers in the "footer"
        And There is a footer ending with essential navigation
        Then There is a footerlink to "Algemene leveringsvoorwaarden"
        And There is a footerlink to "Disclaimer"
        And There is a footerlink to "Privacyverklaring"
