BreakoutGame.Sprite = function (image) {
	
	BreakoutGame.GameObject.call(this);
	
	this.texture = image;
	this.opacity = 1.0;
	this.zOrder = 0;
	
	this._sourceRect;
	this._spriteIndex = 0;
	this._boundingBox = {
		x: 0.0, y: 0.0,
		width: 0.0, height: 0.0
	}
	
	return this;
};

BreakoutGame.Sprite.prototype = new BreakoutGame.GameObject();

BreakoutGame.Sprite.prototype.init = function () { 
	BreakoutGame.GameObject.prototype.init.apply(this);
	
	if (this.texture instanceof BreakoutGame.SpriteSheet) {
		this._sourceRect = BreakoutGame.SpriteSheet.sourceRectForIndex(this.spriteIndex);
	} else {
		this._sourceRect = {
			x: 0, y: 0,
			width: this.texture.width,
			height: this.texture.height
		};
	}
	
	this.boundingBox();
};

BreakoutGame.Sprite.prototype.render = function (deltaTime, context2D) { 
	if (!this.texture || !this.texture.complete) {
		return;
	}
	
	context2D.save();
	context2D.transform(Math.cos(this.transform.angle), Math.sin(this.transform.angle),
	                    -Math.sin(this.transform.angle), Math.cos(this.transform.angle),
						this.transform.x, this.transform.y);

    context2D.globalOpacity = this.opacity;
	
	var offsetX =  - this._sourceRect.width * this.transform.scaleX / 2;
	var offsetY =  - this._sourceRect.height * this.transform.scaleY / 2;
	var width = this._sourceRect.width * this.transform.scaleX;
	var height = this._sourceRect.height * this.transform.scaleY;
	
	context2D.drawImage(this.texture, this._sourceRect.x, this._sourceRect.y,
						this._sourceRect.width, this._sourceRect.height,
						offsetX, offsetY, width, height);
    
	context2D.restore();
};

BreakoutGame.Sprite.prototype.boundingBox = function () {
	this._boundingBox.x = this.transform.x - this._sourceRect.width * this.transform.scaleX / 2;
	this._boundingBox.y = this.transform.y - this._sourceRect.height * this.transform.scaleY / 2;
	this._boundingBox.width = this._sourceRect.width * this.transform.scaleX;
	this._boundingBox.height = this._sourceRect.height * this.transform.scaleY;
	
	return this._boundingBox;
};

BreakoutGame.Sprite.prototype.spriteIndex = function (newIndex) {
	if (newIndex === undefined) {
		return this._spriteIndex;
	} else if (this.texture instanceof BreakoutGame.SpriteSheet) {
		this._spriteIndex = newIndex;
		this._sourceRect = BreakoutGame.SpriteSheet.sourceRectForIndex(this.spriteIndex);
	} else {
		this._spriteIndex = newIndex;
	}
};

