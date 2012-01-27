QUnit.specify("livecache", function(){
    describe("No DOM Monitoring", function(){
        before(function(){
            $.livecache( { monitorDom: false } );
            $('label').remove();
        });
        describe("When no label elements exist", function(){
            it("livecache should show a count of 0", function(){
                assert($.livecache('label').length).equals(0);
            });
            it("the DOM should show a count of 0", function(){
                assert($('label').length).equals(0);
            });
        });
        describe("When label elements are added", function(){
            before(function(){
                $(document.body).append("<label></label>");
                $(document.body).append("<label></label>");
                $(document.body).append("<label></label>");
            });
            describe("", function(){
                it("livecache should show a count of 3", function(){
                    assert($.livecache('label').length).equals(3);
                });
                it("the DOM should show a count of 3", function(){
                    assert($('label').length).equals(3);
                });
            });
            describe("When more label elements are added after result was cached", function(){
                before(function(){
                    $(document.body).append("<label></label>");
                    $(document.body).append("<label></label>");
                    $(document.body).append("<label></label>");
                });
                it("livecache should still show a count of 3", function(){
                    assert($.livecache('label').length).equals(3);
                });
                it("the DOM should show a count of 6", function(){
                    assert($('label').length).equals(6);
                });
                describe("When label elements are removed", function(){
                    before(function(){
                        $('label').remove();
                    });
                    it("livecache should still show a count of 3", function(){
                        assert($.livecache('label').length).equals(3);
                    });
                    it("the DOM should show a count of 0", function(){
                        assert($('label').length).equals(0);
                    });
                })
            });
        });
    });
    describe("DOM Monitoring w/Cache Invalidation", function(){
        before(function(){
            $.livecache( { monitorDom: true, invalidateOnly: true } );
            $('label').remove();
            $.livecache("label", true);
        });
        describe("When no label elements exist", function(){
            it("should show a count of 0", function(){
                assert($.livecache('label').length).equals(0);
            });
            it("the DOM should show a count of 0", function(){
                assert($('label').length).equals(0);
            });
        });
        describe("When label elements are added", function(){
            before(function(){
                $(document.body).append("<label></label>");
                $(document.body).append("<label></label>");
                $(document.body).append("<label></label>");
            });
            describe("", function(){
                it("livecache should show a count of 3", function(){
                    assert($.livecache('label').length).equals(3);
                });
                it("the DOM should show a count of 3", function(){
                    assert($('label').length).equals(3);
                });
            });
            describe("When more label elements are added after result was cached", function(){
                before(function(){
                    $(document.body).append("<label></label>");
                    $(document.body).append("<label></label>");
                    $(document.body).append("<label></label>");
                });
                it("livecache should show a count of 6", function(){
                    assert($.livecache('label').length).equals(6);
                });
                it("the DOM should show a count of 6", function(){
                    assert($('label').length).equals(6);
                });
                describe("When label elements are removed", function(){
                    before(function(){
                        $('label').remove();
                    });
                    it("livecache should show a count of 0", function(){
                        assert($.livecache('label').length).equals(0);
                    });
                    it("the DOM should show a count of 0", function(){
                        assert($('label').length).equals(0);
                    });
                })
            });
        });
    });
    describe("DOM Monitoring w/Cache Refresh", function(){
        before(function(){
            $.livecache( { monitorDom: true, invalidateOnly: true } );
            $('label').remove();
        });
        describe("When no label elements exist", function(){
            it("should show a count of 0", function(){
                assert($.livecache('label').length).equals(0);
            });
            it("the DOM should show a count of 0", function(){
                assert($('label').length).equals(0);
            });
        });
        describe("When label elements are added", function(){
            before(function(){
                $(document.body).append("<label></label>");
                $(document.body).append("<label></label>");
                $(document.body).append("<label></label>");
            });
            describe("", function(){
                it("livecache should show a count of 3", function(){
                    assert($.livecache('label').length).equals(3);
                });
                it("the DOM should show a count of 3", function(){
                    assert($('label').length).equals(3);
                });
            });
            describe("When more label elements are added after result was cached", function(){
                before(function(){
                    $(document.body).append("<label></label>");
                    $(document.body).append("<label></label>");
                    $(document.body).append("<label></label>");
                });
                it("livecache should show a count of 6", function(){
                    assert($.livecache('label').length).equals(6);
                });
                it("the DOM should show a count of 6", function(){
                    assert($('label').length).equals(6);
                });
                describe("When label elements are removed", function(){
                    before(function(){
                        $('label').remove();
                    });
                    it("livecache should show a count of 0", function(){
                        assert($.livecache('label').length).equals(0);
                    });
                    it("the DOM should show a count of 0", function(){
                        assert($('label').length).equals(0);
                    });
                })
            });
        });
    });
});