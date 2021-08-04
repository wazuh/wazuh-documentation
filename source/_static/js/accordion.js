$(function() {

    let outputs = document.getElementsByClassName('output');

    for (let i = 0; i < outputs.length; i++) {
        if(outputs[i].classList.contains("accordion-output")) {
            let outputTitle = outputs[i].getElementsByClassName("admonition-output")[0];
            let outputBody = outputs[i].getElementsByClassName('highlight')[0];

            setAccordionAttributes(outputTitle, {"data-toggle": "collapse",
                                                 "href": "#outputAccordion" + i,
                                                 "role": "button",
                                                 "aria-expanded": "false",
                                                 "aria-controls": "outputAccordion" + i,
                                                 "class": "collapsed"                                       
                                            });

            setAccordionAttributes(outputBody, {"id": "outputAccordion" + i } );
            outputBody.classList.add("collapse");                                        
        }
    }

    let accordions = document.getElementsByClassName("accordion-section");

    for (let j = 0; j < accordions.length; j++) {
        let accordionTitle = accordions[j].previousElementSibling;
        let accordionBody = accordions[j];
        let sectionId = accordions[j].parentElement.getAttribute("id") + "-accordion";
        let accordionParent = accordions[j].parentElement;
        let collapsed = "collapsed";
        let show = "";
        let aria = false;

        if(accordions[j].classList.contains('open')) {
            collapsed = "";
            show = " show";
            aria = true;
        }

        accordionParent.classList.add("accordion-parent");

        setAccordionAttributes(accordionTitle, {"data-toggle": "collapse",
                                                "href": "#" + sectionId,
                                                "role": "button",
                                                "aria-expanded": aria,
                                                "aria-controls": sectionId,
                                                "class": "accordion-title " + collapsed                                       
                                            });  

        setAccordionAttributes(accordionBody, {"class": "accordion-section accordion collapse" + show,
                                               "id": sectionId });

        accordionTitle.innerHTML = "<i class='fas fa-chevron-right'></i>" + accordionTitle.innerHTML;

        let urlIcon = accordionTitle.getElementsByClassName('headerlink')[0];
        urlIcon.addEventListener('click', function(e) {
            if(accordionBody.classList.contains('show')) {
                e.stopPropagation();
            }
        });

        if (window.location.href.indexOf(accordionParent.getAttribute("id")) > -1&& accordionTitle.classList.contains('collapsed')) {
            accordionTitle.click();
        }
    }

    function setAccordionAttributes(element, attrs) {
        for(var key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
    }

});