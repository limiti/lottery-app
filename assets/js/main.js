/*

$(document).ready(function(){

    var LotterySlider = new function(){

        var self = this;

        this.domElements ={
            wrapper: '.lottery-ticket-box-played-tickets-wrapper',
            element: '.lottery-ticket-box-played-mini-ticket-item'
        };

        this.allElements = [];


        this.dataPointLottery = {
            ticketID:1,
            mainPoints:[],
            assetsPoints:0
        };

        this.itemInfo = {
            count : $(self.domElements.element).length
        };


        this.lotteryTemplate = function(){
            return $('<div class="lottery-ticket-box-played-mini-ticket-item"><div class="lottery-ticket-box-border lottery-ticket-box-border-top"><img src="assets/images/lottery-ticket-box-layout-top-mini.png" alt=""<img src="assets/images/lottery-ticket-box-layout-top-mini.png" alt=""></div><div class="lottery-ticket-circle-points-box-main-head"><span class="text-center block">Your numbers</span></div><!-- section --><div class="lottery-ticket-circle-points-box-bottom"><div class="lottery-ticket-circle-points-box-main-extra-title"><span class="block text-center">Your Power Ball</span></div><div class="lottery-ticket-circle-points-box-main-extra"><!--MAIN --></div></div><div class="lottery-ticket-box-assets-control-mini"><a href="#" class="block text-center"><img src="assets/images/icon-lottery-ticket-box-dark-edit.png" alt=""></a><a href="#" class="block text-center"><img src="assets/images/icon-lottery-ticket-box-dark-delete.png" alt=""></a></div><div class="lottery-ticket-box-border lottery-ticket-box-border-bottom"><img src="assets/images/lottery-ticket-box-layout-bottom-mini.png" alt=""><img src="assets/images/lottery-ticket-box-layout-bottom-mini.png" alt=""></div></div>');
        };

        this.lotteryPointsTemplate = function(){
            return $('<div class="lottery-ticket-circle-points-box-main"></div>');
        };

        this.getAllLottery =  function(){

            $(self.domElements.element).each(function(i,e){
                self.allElements = e;
                console.log(self.allElements);
            });

        };
        self.getAllLottery();
        this.getWrapperSize = function(){
            return $(self.domElements.wrapper).outerWidth();
        };

        this.getItemSlipLeft = function (){
            return self.getWrapperSize() / self.itemInfo.count;
        };

        this.getItemWidth = function(){
            return self.getWrapperSize() / self.itemInfo.count;
        };

        this.renderPositionElements = function(){

            var slipLoopLeft = 0;
            $(self.domElements.element).each(function(i,e){

                if(i != 0){
                    $(this).css({
                        'left': slipLoopLeft,
                        'z-index':i
                    });
                };

                if(self.itemInfo.count){
                    $(this).css({
                        'width':self.getItemWidth()
                    });
                }

                $(this).addClass('animated fadeIn');

                slipLoopLeft+=self.getItemSlipLeft();

            });

        };




        this.getLotteryData = function(lotteryElement){

            self.dataPointLottery.mainPoints = [];
            lotteryElement.find('.lottery-ticket-point-number-selected').each(function () {
                self.dataPointLottery.mainPoints.push($(this).data('lottery-selected-point'));
            });

            return self.dataPointLottery.mainPoints;
        };




        this.renderElement = function (selectedPoints){

            var wrapperTmp = self.lotteryTemplate();
            var circleTmp = self.lotteryPointsTemplate();

            for(var i = 0; i < selectedPoints.length; i++ ){
                circleTmp.append('<div class="lottery-ticket-point-number"><span>'+ selectedPoints[i] +'</span></div>')
            }

            $(self.domElements.wrapper).append(wrapperTmp.append(circleTmp));
            self.renderPositionElements();
        };


        this.events = function (){
            $(window).resize(function(){
                self.renderPositionElements();
            });



            $('.lottery-ticket-box-played-mini-ticket-item').click(function(){
                $('.lottery-ticket-box-played-mini-ticket-item-selected').not(this).removeClass('lottery-ticket-box-played-mini-ticket-item-selected');
                $(this).toggleClass('lottery-ticket-box-played-mini-ticket-item-selected');
            });





            $('.lottery-ticket-box-assets-control-button').click(function(e){
                var lotterySelectedElement = $(this).parent().parent();
var selectedPoints = self.getLotteryData(lotterySelectedElement);
                self.renderElement(selectedPoints);

                self.renderPositionElements();

            });
        };

        this.render = function(){
            self.renderPositionElements();
            self.events();
        };

        self.render();

    };

});

*/


$(document).ready(function(){
    var Lottery = new function(){

        var self= this;

        this.lotteryActiveData = {
            id:'',
            name:'',
            mainSelectPoints: [],
            assetsSelectPoints: []
        };

        this.LotteryMiniWrapper = $('.lottery-ticket-box-played-tickets-wrapper');

        this.lotteryMiniWrapTemplate = function(mainPoints, assetsPoint){
            return $('<div class="lottery-ticket-box-played-mini-ticket-item"><div class="lottery-ticket-box-border lottery-ticket-box-border-top"><img src="assets/images/lottery-ticket-box-layout-top-mini.png" alt=""<img src="assets/images/lottery-ticket-box-layout-top-mini.png" alt=""></div><div class="lottery-ticket-circle-points-box-main-head"><span class="text-center block">Your numbers</span></div><!-- mainEL --><div class="lottery-ticket-circle-points-box-main">'+ mainPoints +' </div><div class="lottery-ticket-circle-points-box-bottom"><div class="lottery-ticket-circle-points-box-main-extra-title"><span class="block text-center">Your Power Ball</span></div><div class="lottery-ticket-circle-points-box-main-extra"><!--Assets--><div class="lottery-ticket-point-number lottery-ticket-point-number-selected"><span>' + assetsPoint + '</span></div></div></div><div class="lottery-ticket-box-assets-control-mini"><a href="#" class="block text-center"><img src="assets/images/icon-lottery-ticket-box-dark-edit.png" alt=""></a><a href="#" class="block text-center"><img src="assets/images/icon-lottery-ticket-box-dark-delete.png" alt=""></a></div><div class="lottery-ticket-box-border lottery-ticket-box-border-bottom"><img src="assets/images/lottery-ticket-box-layout-bottom-mini.png" alt=""><img src="assets/images/lottery-ticket-box-layout-bottom-mini.png" alt=""></div></div>');
        };

        this.getLotteryMiniWrapperWidth = function () {
            return $('.lottery-ticket-box-layout').outerWidth();
        };

        this.offsetLeftElement = function(){
            return self.getLotteryMiniWrapperWidth() / $('.lottery-ticket-box-played-mini-ticket-item').length;
        };

        /*Set data pints*/
        this.selectLotteryPoint = function(el, val){
            el.attr('data-lottery-selected-point', val).addClass('lottery-ticket-point-number-selected')
        };

        /*Check selected points*/
        this.checkSelectedPointsGetData = function(el){
            var lotteryData = {
                count: 0,
                points: []
            };

            for(var i = 0 ; i < el.length; i++){
                if(el.length <= 5){
                    if($(el[i]).data('lottery-selected-point')){

                        console.log($(el[i]).data('lottery-selected-point'))
                        lotteryData.count++;
                        lotteryData.points.push($(el[i]).data('lottery-selected-point'));
                    }
                }
            }

            return lotteryData;
        };

        this.renderLotteryMiniBox = function (data){

            var pointsTemplate = $('<div class="lottery-ticket-circle-points-box-main"></div>');

            for(var i = 0; i < data.count; i++){

                pointsTemplate.append('<div class="lottery-ticket-point-number"><span>'+ data.points[i] +'</span></div>');
            }


            self.LotteryMiniWrapper.append(self.lotteryMiniWrapTemplate(pointsTemplate.html(), 1));

        };

        this.renderPosition = function (){
            var countElements = $('.lottery-ticket-box-played-tickets-wrapper .lottery-ticket-box-played-mini-ticket-item').length;
            var leftPosition = self.getLotteryMiniWrapperWidth() / countElements;

            var slipLoopLeft = 0;

            $('.lottery-ticket-box-played-mini-ticket-item').each(function(i,e){
                $(this).css({
                    'z-index': i,
                    'left': slipLoopLeft
                });

                slipLoopLeft+=self.offsetLeftElement();
            });

        };

        /*Set data pints event*/
        $('.lottery-ticket-point-number').click(function(){
            var el = $(this);
            var val = $(this).text();
            self.selectLotteryPoint(el, val);
        });

        /*Check selected points event*/
        $('.lottery-ticket-box').click(function(){
           // $(this).addClass('lottery-ticket-box-selected');

            var el = $(this).find('.lottery-ticket-point-number.lottery-ticket-point-number-selected');
            var selectedData = self.checkSelectedPointsGetData(el);

            if(selectedData.count >= 5){
                $(this).addClass('animated fadeOutLeftBig');
                self.renderLotteryMiniBox(selectedData); // render NEW: element
                self.renderPosition();
            }
        });

        $('.lottery-ticket-box').click(function(){
            $(this).addClass('lottery-ticket-box-selected');
        });

        // USE DATA/ATT FOR EDIT
       /* $('.lottery-ticket-box').click(function(){
             $('.lottery-ticket-box-selected').not(this).removeClass('lottery-ticket-box-selected');
             $(this).toggleClass('lottery-ticket-box-selected');
         });*/



    };


});




