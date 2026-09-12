package psychlua;

class DebugLuaText extends FlxText
{
	public var disableTime:Float = 6;
	public function new() {
		super(10, 10, FlxG.width - 20, '', 16);

		setFormat(Paths.font("vcr.ttf"), 16, FlxColor.WHITE, LEFT, FlxTextBorderStyle.OUTLINE, FlxColor.BLACK);
		scrollFactor.set();
		borderSize = 1;
	}

	public function pushMessage(text:String, color:FlxColor):Void
	{
		if (text == null)
			text = '';

		text = text.trim();
		if (text.length == 0)
			return;

		disableTime = MESSAGE_TIME;
		var shouldShow = !exists || !visible || hiding;

		var entry = findEntry(text, color);
		if (entry != null)
		{
			entry.count++;
			entry.time = MESSAGE_TIME;
		}
		else
		{
			entries.push({
				text: text,
				color: color,
				count: 1,
				time: MESSAGE_TIME
			});
			if (entries.length > MAX_STORED_ENTRIES)
				entries.shift();
		}

		layoutEntries();
		if (shouldShow)
			showPanel();
		else
		{
			alpha = 1;
			updatePanelTargetPosition();
		}
	}

	function findEntry(text:String, color:FlxColor):DebugLuaEntry
	{
		for (entry in entries)
		{
			if (entry.text == text && entry.color == color)
				return entry;
		}
		return null;
	}

	override function update(elapsed:Float):Void
	{
		super.update(elapsed);
		disableTime -= elapsed;
		if(disableTime < 0) disableTime = 0;
		if(disableTime < 1) alpha = disableTime;

		if(alpha == 0 || y >= FlxG.height) kill();
	}

	function layoutEntries():Void
	{
		var availableTextWidth = maxTextWidth();
		for (row in rows)
		{
			row.fieldWidth = availableTextWidth;
			row.wordWrap = true;
		}

		var chosen:Array<DebugLuaEntry> = [];
		var usedHeight:Float = messageStartY() + PADDING;
		var i = entries.length - 1;
		while (i >= 0 && chosen.length < rows.length)
		{
			var entry = entries[i];
			var probe = rows[chosen.length];
			probe.text = displayEntry(entry);
			var rowHeight = measuredRowHeight(probe);
			if (chosen.length > 0 && usedHeight + rowHeight + ROW_GAP > MAX_PANEL_HEIGHT)
				break;

			chosen.unshift(entry);
			usedHeight += rowHeight + (chosen.length > 1 ? ROW_GAP : 0);
			i--;
		}

		for (i in 0...rows.length)
		{
			var row = rows[i];
			if (i >= chosen.length)
			{
				row.visible = false;
				continue;
			}

			var entry = chosen[i];
			row.visible = true;
			row.color = entry.color;
			row.alpha = 1;
			row.text = displayEntry(entry);
		}

		var nextHeight = Std.int(Math.min(MAX_PANEL_HEIGHT, Math.max(MIN_PANEL_HEIGHT, Math.ceil(usedHeight))));
		var nextWidth = calculatePanelWidth();
		if (nextHeight != panelHeight || nextWidth != panelWidth)
		{
			panelHeight = nextHeight;
			panelWidth = nextWidth;
			redrawPanel();
		}
		else
			background.alpha = BACKGROUND_ALPHA;
		updatePanelTargetPosition();

		var yPos:Float = messageStartY();
		var finalTextWidth = Math.max(80, panelWidth - PADDING * 2);
		background.x = panelX;
		background.y = panelY;
		titleText.x = panelX + PADDING;
		titleText.y = panelY + TITLE_Y;
		titleText.fieldWidth = finalTextWidth;
		for (row in rows)
		{
			if (!row.visible)
				continue;

			row.x = panelX + PADDING;
			row.fieldWidth = finalTextWidth;
			row.y = panelY + yPos;
			yPos += measuredRowHeight(row) + ROW_GAP;
		}
	}

	function calculatePanelWidth():Int
	{
		var widest:Float = titleText.textField != null ? titleText.textField.textWidth : titleText.width;
		for (row in rows)
		{
			if (row != null && row.visible)
			{
				var rowWidth:Float = row.textField != null ? row.textField.textWidth : row.width;
				if (rowWidth > widest)
					widest = rowWidth;
			}
		}
		return Std.int(Math.min(viewWidth() - PANEL_MARGIN * 2, Math.max(MIN_PANEL_WIDTH, Math.ceil(widest + PADDING * 2 + 14))));
	}

	function maxTextWidth():Int
	{
		return Std.int(Math.max(120, viewWidth() - PANEL_MARGIN * 2 - PADDING * 2));
	}

	function displayEntry(entry:DebugLuaEntry):String
	{
		return entry.count > 1 ? '${entry.text} x${entry.count}' : entry.text;
	}

	function measuredRowHeight(row:FlxText):Float
	{
		if (row == null)
			return 20;
		return Math.max(20, (row.textField != null ? row.textField.textHeight : row.height) + 6);
	}

	function measuredTitleHeight():Float
	{
		if (titleText == null)
			return 20;
		return Math.max(18, (titleText.textField != null ? titleText.textField.textHeight : titleText.height) + 2);
	}

	function messageStartY():Float
	{
		return TITLE_Y + measuredTitleHeight() + TITLE_GAP;
	}

	function showPanel():Void
	{
		if (hideTween != null)
			hideTween.cancel();
		if (showTween != null)
			showTween.cancel();

		hiding = false;
		revive();
		visible = true;
		active = true;
		alpha = 0;
		x = 0;
		y = 0;
		panelX = targetX();
		panelY = enterY();
		showTween = FlxTween.tween(this, {panelY: targetY(), alpha: 1}, TWEEN_TIME, {
			ease: FlxEase.quadOut,
			onUpdate: function(_) layoutEntries()
		});
		layoutEntries();
	}

	function startHide():Void
	{
		if (hiding || !visible)
			return;

		if (showTween != null)
			showTween.cancel();
		if (hideTween != null)
			hideTween.cancel();

		hiding = true;
		hideTween = FlxTween.tween(this, {panelY: exitY(), alpha: 0}, TWEEN_TIME, {
			ease: FlxEase.quadIn,
			onUpdate: function(_) layoutEntries(),
			onComplete: function(_)
			{
				entries.resize(0);
				for (row in rows)
					row.visible = false;
				hiding = false;
				kill();
			}
		});
	}

	function redrawPanel():Void
	{
		MD3ShapeTools.fillAndStrokeRoundRect(background, panelWidth, panelHeight, 22, 2, MD3Theme.surfaceContainerHigh, MD3Theme.outlineVariant);
		background.alpha = BACKGROUND_ALPHA;
	}

	inline function targetX():Float
		return (viewWidth() - panelWidth) * 0.5;

	inline function targetY():Float
		return ClientPrefs.data.downScroll ? PANEL_MARGIN : viewHeight() - panelHeight - PANEL_MARGIN;

	inline function enterY():Float
		return ClientPrefs.data.downScroll ? -panelHeight - PANEL_MARGIN : viewHeight() + PANEL_MARGIN;

	inline function exitY():Float
		return ClientPrefs.data.downScroll ? -panelHeight - PANEL_MARGIN : viewHeight() + PANEL_MARGIN;

	inline function viewWidth():Float
		return cameras != null && cameras.length > 0 && cameras[0] != null ? cameras[0].width : FlxG.width;

	inline function viewHeight():Float
		return cameras != null && cameras.length > 0 && cameras[0] != null ? cameras[0].height : FlxG.height;

	function updatePanelTargetPosition():Void
	{
		if (!visible || hiding || showTween != null && !showTween.finished)
			return;

		panelX = targetX();
		panelY = targetY();
	}

	override function destroy():Void
	{
		if (showTween != null)
			showTween.cancel();
		if (hideTween != null)
			hideTween.cancel();
		super.destroy();
	}
}

