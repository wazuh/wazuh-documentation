$(function() {

    let outputs = $('.output');

    for (let i = 0; i < outputs.length; i++) {
        if(outputs[i].classList.contains('accordion-output')) {
            let outputTitle = outputs[i].getElementsByClassName('admonition-output')[0];

            setAccordionAttributes(outputTitle, {"data-toggle": "collapse",
                                                 "href": "#outputAccordion" + i,
                                                 "role": "button",
                                                 "aria-expanded": "false",
                                                 "aria-controls": "outputAccordion" + i,
                                                 "class": "collapsed"                                       
                                            });
                                            
            $(".highlight", outputs[i]).addClass('collapse')
                                       .attr("id", "outputAccordion" + i);
        }
    }

    let accordions = document.getElementsByClassName('accordion-section');

    for (let j = 0; j < accordions.length; j++) {
        let accordionTitle = accordions[j].previousElementSibling;
        let accordionBody = accordions[j];
        let sectionId = accordions[j].parentElement.getAttribute('id') + "-accordion";

        setAccordionAttributes(accordionTitle, {"data-toggle": "collapse",
                                                "href": "#" + sectionId,
                                                "role": "button",
                                                "aria-expanded": "false",
                                                "aria-controls": sectionId,
                                                "class": "accordion-title collapsed"                                       
                                            });  
        $(accordionTitle).prepend('<i class="fas fa-chevron-right"></i>');

        setAccordionAttributes(accordionBody, {"class": "accordion-section accordion collapse",
                                               "id": sectionId });
    }

    function setAccordionAttributes(element, attrs) {
        for(var key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
    }
    
    
});